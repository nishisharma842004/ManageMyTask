import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { db } from '../../services/firebase.config';

const EditTask = ({ task }) => {
  const [show, setShow] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);
  const [editedCategory, setEditedCategory] = useState(task.category || '');
  const [editedPriority, setEditedPriority] = useState(task.priority || 'medium');
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        task: editedTask,
        category: editedCategory,
        priority: editedPriority,
        dueDate: editedDueDate
      });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-warning me-2" onClick={handleShow}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label>Task</label>
            <input
              type="text"
              className="form-control"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Category</label>
            <select
              className="form-control"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Priority</label>
            <select
              className="form-control"
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTask;