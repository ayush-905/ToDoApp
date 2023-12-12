import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'
import Select from 'react-select';
import { toast } from 'react-toastify';

const options = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

function AddTask() {
  const [text, setText] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    if(!selectedOption||!text){  
      return toast.error("Please fill all fields")
    }
    dispatch(createTask({name:text,status: selectedOption.value}))
    setText('')
    setSelectedOption(null)
  }

  return (
    <div className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Task</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor='text'>Priority</label>
          <Select
            className='select'
            key={selectedOption ? selectedOption.value : 'default'}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask
