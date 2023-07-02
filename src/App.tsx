import './styles/globals.scss'
import Table from './components/reusable/table'
import AddTask from './components/addTask'
import { Box } from '@mui/material'
import { taskDelete, taskUpdate } from './firebase/taskMutation'
import { useRecoilState } from 'recoil'
import { getTaskSelector } from './store/selectors'
import { Suspense } from 'react'
import { ITask } from './types/taskModel'
import { Timestamp } from 'firebase/firestore'

const columns = ['id', 'name', 'description', 'date', 'status', '']

function App() {
  const [tasks, setTask] = useRecoilState(getTaskSelector)
  const taskUpdateHandler = async (
    id: string,
    task: Omit<ITask, 'date'> & { date: string },
  ) => {
    console.log({ task }, 'updateTask')
    setTask((prevTask) => {
      return prevTask.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            ...task,
            date: task.date,
          }
        }
        return t
      })
    })
    await taskUpdate(id, {
      ...task,
      date: Timestamp.fromDate(new Date(task.date)),
    })
  }
  const deleteTaskHandler = async (id: string) => {
    setTask((prevTask) => {
      return prevTask.filter((t) => t.id !== id)
    })
    await taskDelete(id)
  }

  return (
    <div>
      <AddTask />
      <Box
        mt={4}
        sx={{
          maxWidth: 900,
          marginInline: 'auto',
        }}
      >
        <Suspense fallback={<h1>Loading...</h1>}>
          <Table
            deleteHandler={deleteTaskHandler}
            updateHandler={taskUpdateHandler}
            columns={columns}
            data={tasks}
          />
        </Suspense>
      </Box>
    </div>
  )
}

export default App
