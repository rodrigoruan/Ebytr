import React from 'react';

import sleepIcon from '../imgs/sleep.svg';

function TasksNotFound() {
  return (
    <div className="no-tasks-container">
      <h1 className="no-tasks">
        Seems doesn&lsquo;t have any tasks yet...
      </h1>
      <img src={sleepIcon} alt="sleep icon" />
    </div>
  );
}

export default TasksNotFound;
