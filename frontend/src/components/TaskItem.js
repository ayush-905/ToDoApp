import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';
import Select from 'react-select'

const options = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const TaskItem = ({ task,onEdit }) => {
  const dispatch = useDispatch();
  const dateObject = new Date(task.createdAt);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  const date = `${year}/${month}/${day}`;
  const time = `${hours}:${minutes}:${seconds}`;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState( task.name );
  const [selectedOption, setSelectedOption] = useState(task.status);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTask={
      name: editedTask,
      status: selectedOption.value,
    }
    onEdit(updatedTask,task.id)
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className='task'>
      <div className='date'>Created On: {date} {time}</div>
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editedTask}
            onChange={(e)=>setEditedTask(e.target.value)}
          />
          <Select
            className='select'
            key={selectedOption ? selectedOption.value : 'default'}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Priority"
          />
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <button className='edit' onClick={handleSaveClick}>Save</button>
          <button className='edit' onClick={handleCancelClick}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3 className='name'>Task: {task.name}</h3>
          <h3 className='priority'>Priority: {task.status}</h3>
          
          <button className='edit' onClick={handleEditClick}>Edit</button>
          <button onClick={() => dispatch(deleteTask(task.id))} className='close'>
            X
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
