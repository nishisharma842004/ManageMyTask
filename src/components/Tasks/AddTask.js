import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase.config';

const AddTask = () => {
  const { currentUser } = useAuth();
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        task,
        isChecked: false,
        category,
        priority,
        dueDate,
        userId: currentUser.uid,
        timestamp: serverTimestamp()
      });
      setTask('');
      setCategory('');
      setPriority('medium');
      setDueDate('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form mb-4">
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-control"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTask;