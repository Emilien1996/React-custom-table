import { useState } from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Box, Button, Grid, TextField } from '@mui/material'
import { taskMutate } from '../firebase/taskMutation'
import { Timestamp } from 'firebase/firestore'
import { generateRandomId } from '../helpers'
import { useRecoilState } from 'recoil'
import { getTaskSelector } from '../store/selectors'

const initialValues = {
  name: '',
  description: '',
  date: dayjs(),
  status: 'active',
  taskID: 1,
}

const AddTask = () => {
  const [values, setValues] = useState(initialValues)
  const [tasks, setTask] = useRecoilState(getTaskSelector)

  const createTask = async () => {
    const modifiedDate = {
      ...values,
      date: Timestamp.fromDate(values.date.toDate()),
      taskID: generateRandomId().toString(),
    }
    // @ts-ignore
    setTask(() => {
      return [
        ...tasks,
        {
          ...modifiedDate,
          date: values.date.toDate(),
          id: generateRandomId().toString(),
        },
      ]
    })

    await taskMutate(modifiedDate)
    setValues(initialValues)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      }
    })
  }
  return (
    <Box
      marginTop={4}
      display="flex"
      justifyContent="center"
      alignItems={'center'}
    >
      <Grid
        width="500px"
        container
        direction={'column'}
        sx={{
          gap: '10px',
        }}
      >
        <TextField
          name="name"
          value={values.name}
          onChange={handleChange}
          label="name"
          variant="standard"
        />
        <TextField
          name="description"
          value={values.description}
          onChange={handleChange}
          label="description"
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Controlled picker"
              value={values.date}
              onChange={(newValue) =>
                setValues((prevVal) => {
                  return {
                    ...prevVal,
                    date: newValue ?? dayjs(),
                  }
                })
              }
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" onClick={createTask}>
          Create Task
        </Button>
      </Grid>
    </Box>
  )
}
export default AddTask
