
const TaskStats = ({ tasks }) => {
  const completed = tasks.filter(task => task.isChecked).length;
  const pending = tasks.length - completed;
  
  const highPriority = tasks.filter(task => task.priority === 'high').length;
  const mediumPriority = tasks.filter(task => task.priority === 'medium').length;
  const lowPriority = tasks.filter(task => task.priority === 'low').length;

  return (
    <div className="task-stats mb-4">
      <div className="row">
        <div className="col-md-3">
          <div className="stat-card bg-primary text-white">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card bg-success text-white">
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card bg-warning text-dark">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card bg-info text-white">
            <h3>{highPriority}</h3>
            <p>High Priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;