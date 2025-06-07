import { collection, deleteDoc, doc, getDocs, orderBy, query, runTransaction, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase.config';
import AddTask from './AddTask';
import EditTask from './EditTask';
import TaskStats from './TaskStats';

const TaskList = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const collectionRef = collection(db, 'tasks');

  useEffect(() => {
    const getTasks = async () => {
      if (!currentUser) return;
      
      let q;
      if (filter === 'completed') {
        q = query(collectionRef, 
          where('userId', '==', currentUser.uid),
          where('isChecked', '==', true),
          orderBy('dueDate'),
          orderBy('timestamp')
        );
      } else if (filter === 'pending') {
        q = query(collectionRef, 
          where('userId', '==', currentUser.uid),
          where('isChecked', '==', false),
          orderBy('dueDate'),
          orderBy('timestamp')
        );
      } else {
        q = query(collectionRef, 
          where('userId', '==', currentUser.uid),
          orderBy('dueDate'),
          orderBy('timestamp')
        );
      }

      const tasksSnapshot = await getDocs(q);
      const tasksData = tasksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTasks(tasksData);
    };

    getTasks();
  }, [currentUser, filter]);

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteDoc(doc(db, "tasks", id));
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const checkHandler = async (event, taskId) => {
    const newCheckedState = event.target.checked;
    
    try {
      const docRef = doc(db, "tasks", taskId);
      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(docRef);
        if (!taskDoc.exists()) {
          throw "Document does not exist!";
        }
        transaction.update(docRef, { isChecked: newCheckedState });
      });
      
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, isChecked: newCheckedState } : task
      ));
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-list-container">
      <div className="task-controls mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select 
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <TaskStats tasks={tasks} />

      <AddTask />

      <div className="task-items">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`task-item ${task.isChecked ? 'completed' : ''}`}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.isChecked || false}
                onChange={(e) => checkHandler(e, task.id)}
                id={`task-${task.id}`}
              />
              <label className="form-check-label" htmlFor={`task-${task.id}`}>
                <span className="task-text">{task.task}</span>
                <div className="task-meta">
                  {task.category && <span className="badge bg-info">{task.category}</span>}
                  {task.priority === 'high' && <span className="badge bg-danger">High</span>}
                  {task.priority === 'medium' && <span className="badge bg-warning">Medium</span>}
                  {task.priority === 'low' && <span className="badge bg-success">Low</span>}
                  {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>
              </label>
            </div>
            <div className="task-actions">
              <EditTask task={task} />
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;