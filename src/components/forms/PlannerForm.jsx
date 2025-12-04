import React, { useState, useEffect, useMemo } from 'react';
import '../../styles/PlannerForm.css'; // 스타일시트를 가져옵니다.
import '../../styles/variables.css'; // CSS 변수를 가져옵니다.

// 고정 공휴일 정의
const solarHolidays = {
  "01-01": "신정",
  "03-01": "삼일절",
  "05-05": "어린이날",
  "06-06": "현충일",
  "08-15": "광복절",
  "10-03": "개천절",
  "10-09": "한글날",
  "12-25": "성탄절"
};

const PlannerForm = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [theme, setTheme] = useState('light');
  const [modal, setModal] = useState({ isOpen: false, type: '', data: {} });
  const [selection, setSelection] = useState({ start: null, end: null });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const holidaysMap = useMemo(() => {
    const map = {};
    for (const [md, name] of Object.entries(solarHolidays)) {
      map[`${currentYear}-${md}`] = name;
    }
    for (const [dateStr, name] of Object.entries({ ...map })) {
      const dayOfWeek = new Date(dateStr).getDay();
      if (dayOfWeek === 0) {
        const nextDay = new Date(dateStr);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDateStr = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, "0")}-${String(nextDay.getDate()).padStart(2, "0")}`;
        map[nextDateStr] = `${name} 대체공휴일`;
      }
    }
    return map;
  }, [currentYear]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentYear, currentMonth + delta, 1));
  };

  const handleDateClick = (dateStr) => {
    const dayEvents = events.filter(e => {
      const eventStart = new Date(e.start);
      eventStart.setHours(0, 0, 0, 0);
      const eventEnd = new Date(e.end);
      eventEnd.setHours(23, 59, 59, 999);
      const clickedDate = new Date(dateStr);
      return clickedDate >= eventStart && clickedDate <= eventEnd;
    });

    if (dayEvents.length > 0) {
      setModal({ isOpen: true, type: 'list', data: { date: dateStr, events: dayEvents } });
      return;
    }

    if (!selection.start) {
      setSelection({ start: dateStr, end: null });
    } else {
      let start = new Date(selection.start);
      let end = new Date(dateStr);
      if (start > end) [start, end] = [end, start];
      const startDateStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
      const endDateStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
      setModal({ isOpen: true, type: 'add', data: { start: startDateStr, end: endDateStr } });
      setSelection({ start: null, end: null });
    }
  };

  const saveEvent = (newEvent) => {
    const eventWithId = { ...newEvent, id: Date.now() };
    setEvents([...events, eventWithId]);
    setModal({ isOpen: false, type: '', data: {} });
  };

  const deleteEvent = (eventToDelete) => {
    if (window.confirm('이 일정을 삭제하시겠습니까?')) {
      setEvents(events.filter(e => e.id !== eventToDelete.id));
      alert('✅ 일정이 삭제되었습니다.');
      setModal({ isOpen: false, type: '', data: {} });
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();

    const calendarRows = [];
    let weekDays = [];

    // Previous month's days
    for (let i = startDayOfWeek; i > 0; i--) {
      const day = prevLastDay - i + 1;
      weekDays.push(
        <td key={`prev-${day}`} className="other-month">
          <div className="day-number">{day}</div>
        </td>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const dayEvents = events.filter(e => {
        const eventStart = new Date(e.start);
        eventStart.setHours(0, 0, 0, 0);
        const eventEnd = new Date(e.end);
        eventEnd.setHours(23, 59, 59, 999);
        return date >= eventStart && date <= eventEnd;
      });

      const weekday = date.getDay();
      const isHoliday = holidaysMap[dateStr] !== undefined;
      let dayClass = '';
      if (dateStr === todayStr) dayClass += ' today';
      if (weekday === 0 || isHoliday) dayClass += ' sun';
      if (weekday === 6) dayClass += ' sat';
      if (selection.start === dateStr) dayClass += ' selected-start';


      weekDays.push(
        <td key={dateStr} className={dayClass} onClick={() => handleDateClick(dateStr)}>
          <div className="day-number">{day}</div>
          {isHoliday && <div style={{fontSize: '0.75rem', color: '#e03131'}}>{holidaysMap[dateStr]}</div>}
          <div className="event-labels">
            {dayEvents.map((ev) => (
              <div key={ev.id} className={`event-label bg-${ev.type.replace(/&/g, '')}`}>
                {ev.name}
              </div>
            ))}
          </div>
        </td>
      );

      if (weekDays.length === 7) {
        calendarRows.push(<tr key={`week-${calendarRows.length}`}>{weekDays}</tr>);
        weekDays = [];
      }
    }

    // Next month's days
    const remainingDays = 7 - weekDays.length;
    if(weekDays.length > 0) {
        for (let i = 1; i <= remainingDays; i++) {
            weekDays.push(
                <td key={`next-${i}`} className="other-month">
                <div className="day-number">{i}</div>
                </td>
            );
        }
        calendarRows.push(<tr key={`week-${calendarRows.length}`}>{weekDays}</tr>);
    }
    
    // Ensure 6 rows for consistent height
    while (calendarRows.length < 6) {
        let extraWeek = [];
        let day = (calendarRows.length === 5 && weekDays.length === 0 ? remainingDays + 1 : 1)
        if(calendarRows.length === 4 && weekDays.length === 0){
             day = remainingDays + 8;
        }


        for(let i=0; i<7; i++){
            const nextMonthDay = day + i;
            extraWeek.push(
                 <td key={`extra-week-${calendarRows.length}-${i}`} className="other-month">
                    <div className="day-number">{nextMonthDay}</div>
                </td>
            )
        }
         calendarRows.push(<tr key={`extra-week-${calendarRows.length}`}>{extraWeek}</tr>);
    }


    return <tbody>{calendarRows}</tbody>;
  };

  return (
    <div className="container">
      <h1>밀리 플래너</h1>
      <button id="themeToggle" className="theme-btn" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
      </button>

      <div id="monthContainer">
        <button className="arrow-btn" onClick={() => changeMonth(-1)}>&lt;</button>
        <h2 id="monthDisplay">{`${currentYear}년 ${String(currentMonth + 1).padStart(2, '0')}월`}</h2>
        <button className="arrow-btn" onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div id="calendar">
        <table>
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          {renderCalendar()}
        </table>
      </div>

      {modal.isOpen && <EventModal modal={modal} setModal={setModal} onSave={saveEvent} onDelete={deleteEvent} />}
    </div>
  );
};

// 모달 컴포넌트
const EventModal = ({ modal, setModal, onSave, onDelete }) => {
  const { type, data } = modal;
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('휴가');

  const handleSave = (e) => {
    e.preventDefault();
    if (!eventName) return alert('일정 이름을 입력하세요.');
    onSave({ name: eventName, type: eventType, start: data.start, end: data.end });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: '', data: {} });
    // Also clear selection when closing add modal without saving
    if (type === 'add') {
        // This needs a way to communicate back to PlannerPage to clear selection
        // For now, we rely on the user clicking a date again to reset.
    }
  };

  if (type === 'add') {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>📅 일정 추가</h2>
          <form onSubmit={handleSave}>
            <p><strong>기간:</strong> {data.start} ~ {data.end}</p>
            <label>일정 이름</label>
            <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="예: 정기휴가" required />
            <label>일정 타입</label>
            <select value={eventType} onChange={e => setEventType(e.target.value)} required>
              <option value="휴가">휴가</option>
              <option value="외출&외박">외출&외박</option>
              <option value="훈련">훈련</option>
              <option value="당직근무">당직근무</option>
            </select>
            <div className="modal-actions">
              <button type="submit" className="save-btn">저장</button>
              <button type="button" onClick={closeModal} className="cancel-btn">취소</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>📅 {data.date} 일정 목록</h2>
          {data.events.map((e) => (
            <div key={e.id} className="event-card">
              <div className="event-title">{e.name}</div>
              <small>{e.type} ({e.start} ~ {e.end})</small>
              <button className="delete-btn" onClick={() => onDelete(e)}>🗑 일정 삭제</button>
            </div>
          ))}
          <div className="modal-actions">
            <button type="button" onClick={closeModal} className="cancel-btn">닫기</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// The modal backdrop should be styled to be displayed
const EventModalStyle = () => (
    <style>{`
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
        }
    `}</style>
);

// Add this to the PlannerPage component's return statement
// This is a bit of a hack. Ideally, this style should be in the CSS file.
const PlannerPageWrapper = () => (
    <>
        <PlannerPage />
        <EventModalStyle />
    </>
)


export default PlannerForm;
