import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, reset, updateTask } from '../features/tasks/taskSlice'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import AddTask from './AddTask'
import TaskItem from './TaskItem'
import Select from 'react-select';

const options = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [data,setData] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks)
 
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if (!user) {
        navigate('/')
    }

    if (user) {
      dispatch(getTasks());
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  useEffect(()=>{
    setData(tasks)
    if(selectedOption){
      const newData = tasks.filter(
        (task) => task.status == selectedOption.value)
        setData(newData)
    }
  },[tasks,selectedOption])

  const handleTaskEdit = (updatedTask,id) => {
    dispatch(updateTask({taskData:updatedTask, id :id }));
    toast.success('Task edited successfully!');
  };

  if (isLoading) {
    return <Spinner/>
  }


  return (
    <>
      <div className='heading'>
        <h1>Welcome {user && user.name}</h1>

      </div>

     <AddTask/>
     <div className='filter'>
        <h4 style={{marginBottom:'5px', paddingLeft:'10px'}}>Filter tasks: </h4>
        <Select
          className='select'
          key={selectedOption ? selectedOption.value : 'default'}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          placeholder="Priority"
          />
      </div>
      <div className='heading' style={{marginBottom:'10px'}}>        
        <span>Your Tasks</span>
      </div>
      <div>
      {data.length > 0 ? (
          <div className='tasks'>
            {data.map((prop) => (
              <TaskItem key={prop.id} task={prop} onEdit={handleTaskEdit}/>
            ))}
          </div>
        ) : (
          <h3></h3>
        )}
      </div>
    </>
  )
}

export default Dashboard
