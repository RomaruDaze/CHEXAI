import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import './calender.css';
import { useTasks } from '../../context/TaskContext';
import type { Task } from '../../context/TaskContext';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const { tasks, addTask, deleteTask } = useTasks();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newEventTitle.trim()) return;

    addTask({
      title: newEventTitle.trim(),
      date: selectedDate,
      completed: false,
      source: 'calendar'
    });

    setNewEventTitle('');
  };

  const getEventsForDate = (date: Date) => {
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Calendar</h2>
        <div className="calendar-nav">
          <button onClick={prevMonth}>&lt;</button>
          <span>{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={nextMonth}>&gt;</button>
        </div>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        
        {days.map((day: Date) => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={day.toString()}
              className={`calendar-day ${
                !isSameMonth(day, currentDate) ? 'other-month' : ''
              } ${isToday(day) ? 'today' : ''} ${
                selectedDate?.toDateString() === day.toDateString() ? 'selected' : ''
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <span className="day-number">{format(day, 'd')}</span>
              {dayEvents.length > 0 && (
                <div className="day-events">
                  {dayEvents.map(task => (
                    <div key={task.id} className="event-item">
                      <span className={`flag ${task.source}`}></span>
                      <span>{task.title}</span>
                      <button
                        className="delete-event"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <form onSubmit={addEvent} className="event-form">
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder={`Add event for ${format(selectedDate, 'MMM d, yyyy')}`}
          />
          <button type="submit">Add Event</button>
        </form>
      )}
    </div>
  );
};

export default Calendar;