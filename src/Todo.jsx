import React, { useState } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Medium" });

  const categorizeTasks = (tasks) => {
    const today = new Date().toISOString().split("T")[0];
    return {
      Today: tasks.filter(task => task.dueDate === today && !task.completed),
      Upcoming: tasks.filter(task => task.dueDate > today && !task.completed),
      Overdue: tasks.filter(task => task.dueDate < today && !task.completed),
      Completed: tasks.filter(task => task.completed)
    };
  };

  const addTask = () => {
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    setNewTask({ title: "", description: "", dueDate: "", priority: "Medium" });
    setShowPopup(false);
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const categorized = categorizeTasks(tasks);

  const priorityColor = {
    High: "high-priority",
    Medium: "medium-priority",
    Low: "low-priority"
  };

  return (
    <div className="container">
      <h1 className="title">To-Do App</h1>
      <button className="add-btn" onClick={() => setShowPopup(true)}>Add Task</button>

      {Object.keys(categorized).map(category => (
        <div key={category} className="category">
          <h2 className="category-title">{category}</h2>
          <div>
            {categorized[category].map(task => (
              <div key={task.id} className={`task-card ${priorityColor[task.priority]}`}>
                <div className="task-info">
                  <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(task.id)} />
                  <span className={task.completed ? "completed" : ""}>{task.title}</span>
                  <div className="due-date">Due: {task.dueDate}</div>
                </div>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add Task</h2>
            <input type="text" placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
            <textarea placeholder="Description (optional)" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
            <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
            <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <div className="popup-actions">
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="save-btn" onClick={addTask}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
