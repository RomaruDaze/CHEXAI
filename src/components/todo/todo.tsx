import React, { useState } from 'react';
import './todo.css';
import { useTasks } from '../../context/TaskContext';
import { format } from 'date-fns';

const TodoList: React.FC = () => {
  const [input, setInput] = useState('');
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();

  // Sort tasks by date and separate by source
  const todoTasks = tasks
    .filter(task => task.source === 'todo')
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const calendarTasks = tasks
    .filter(task => task.source === 'calendar')
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addTask({
      title: input.trim(),
      date: new Date(),
      completed: false,
      source: 'todo'
    });

    setInput('');
  };

  const renderTaskList = (tasks: typeof todoTasks, type: 'todo' | 'calendar') => (
    <div className="task-section">
      <h3 className="section-title">
        {type === 'todo' ? 'Todo Tasks' : 'Calendar Events'}
      </h3>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No {type === 'todo' ? 'tasks' : 'events'} yet.</p>
        </div>
      ) : (
        tasks.map(task => (
          <div key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={`flag ${task.source}`}></span>
              <div className="task-details">
                <span className="task-title">{task.title}</span>
                {type === 'calendar' && (
                  <span className="task-deadline">
                    Due: {format(task.date, 'MMM d, yyyy')}
                  </span>
                )}
              </div>
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>Todo List</h2>
      </div>

      <form onSubmit={handleAddTodo} className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="todo-list">
        {renderTaskList(todoTasks, 'todo')}
        {renderTaskList(calendarTasks, 'calendar')}
      </div>
    </div>
  );
};

export default TodoList;
