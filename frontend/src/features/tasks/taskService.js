import axios from 'axios'
import { API_URL } from '../../utils/helper.js'


// Create new task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL +'/api/tasks/', taskData, config)
  return response.data
}

// Get user tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + '/api/tasks/', config)
  return response.data
}

// Update user task
const updateTask= async(taskData, taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.put(API_URL + '/api/tasks/' + taskId, taskData, config)
  return response.data
}

// Delete user task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + '/api/tasks/' + taskId, config)
  return response.data
}

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
}

export default taskService
