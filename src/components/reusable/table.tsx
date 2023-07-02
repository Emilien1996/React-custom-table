import dayjs from 'dayjs'
import { ReadOnlyProps } from '../../types/props'
import { ITask } from '../../types/taskModel'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import DatePicker from './DatePicker'

interface IProps {
  data: (Omit<ITask, 'date'> & { date: string; [key: string]: string })[]
  columns: string[]
  updateHandler: (id: string, task: any) => void
  deleteHandler: (id: string) => void
}

type TableProps = ReadOnlyProps<IProps>

const Table: React.FC<TableProps> = ({
  data,
  columns,
  updateHandler,
  deleteHandler,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('active')
  const [isEdit, setIsEdit] = useState<null | { id: string; column: string }>()
  const [editedData, setEditedData] = useState<{
    [key: string]: string
  }>({})
  const [filteredData, setFiltered] = useState(data)
  const [filterValue, setFilterValues] = useState({
    id: '',
    name: '',
    description: '',
  })

  useEffect(() => {
    const filteredData = data.filter((col) => {
      const nameMatch = col.name
        .toLowerCase()
        .includes(filterValue.name.toLowerCase())
      const descriptionMatch = col.description
        .toLowerCase()
        .includes(filterValue.description.toLowerCase())
      const statusMatch = col.status === selectedStatus
      const idMatch = col.taskID.toString().includes(filterValue.id)

      return nameMatch && descriptionMatch && statusMatch && idMatch
    })

    setFiltered(filteredData)
  }, [data, filterValue, selectedStatus])

  const handleFilterValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilterValues((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value)
  }
  const handleEdit = (id: string, column: string) => {
    const task = data.find((col) => col.id === id)
    const updatedData = {
      ...editedData,
      [column]: task ? task[column] : '',
    }
    setEditedData(updatedData)
    setIsEdit({ id, column })
  }
  const handleSelectedInputs = (val: string, column: string) => {
    setEditedData({ ...editedData, [column]: val })
  }

  const checkEditable = (id: string, column: string) => {
    return isEdit?.id === id && isEdit?.column === column
  }
  const copiedData = filteredData.length > 0 ? filteredData : data
  console.log({ editedData })
  const statusOptions = ['active', 'pending', 'cancelled']
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((header) => {
            return <td key={header}>{header}</td>
          })}
        </tr>
        <tr>
          {columns.map((header) => {
            const isStatus = header === 'status'
            const isEmptyOrDate = header === '' || header === 'date'
            return (
              <td key={header}>
                {isStatus ? (
                  <FormControl size="small">
                    <InputLabel>status</InputLabel>
                    <Select
                      value={selectedStatus}
                      label={header}
                      onChange={handleChange}
                    >
                      {statusOptions.map((status) => {
                        return (
                          <MenuItem value={status} key={status}>
                            {status}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                ) : isEmptyOrDate ? (
                  <></>
                ) : (
                  <TextField
                    sx={{
                      backgroundColor: 'white',
                    }}
                    onChange={handleFilterValues}
                    size="small"
                    label={header}
                    name={header}
                  />
                )}
              </td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {copiedData.map((col) => {
          return (
            <tr key={col.id}>
              <td>{col.taskID}</td>
              <td
                onClick={() => handleEdit(col.id, 'name')}
                onBlur={() =>
                  updateHandler(col.id, { name: editedData['name'] })
                }
              >
                {checkEditable(col.id, 'name') ? (
                  <TextField
                    value={editedData['name'] || ''}
                    onChange={(e) => {
                      handleSelectedInputs(e.target.value, 'name')
                    }}
                    size="small"
                  />
                ) : (
                  col.name
                )}
              </td>
              <td
                onBlur={() =>
                  updateHandler(col.id, { description: editedData.description })
                }
                onClick={() => handleEdit(col.id, 'description')}
              >
                {checkEditable(col.id, 'description') ? (
                  <TextField
                    onChange={(e) => {
                      handleSelectedInputs(e.target.value, 'description')
                    }}
                    value={editedData['description']}
                    size="small"
                  />
                ) : (
                  col.description
                )}
              </td>
              <td
                onBlur={() =>
                  updateHandler(col.id, {
                    date: editedData.date,
                  })
                }
                onClick={() => handleEdit(col.id, 'date')}
              >
                {checkEditable(col.id, 'date') ? (
                  <DatePicker
                    label="date"
                    value={dayjs(editedData['date'])}
                    handleChange={handleSelectedInputs}
                  />
                ) : (
                  dayjs(col.date).format('MM/DD/YYYY HH:mm')
                )}
              </td>
              <td onClick={() => handleEdit(col.id, 'status')}>
                {checkEditable(col.id, 'status') ? (
                  <FormControl size="small">
                    <Select
                      value={editedData['status']}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectedInputs(e.target.value, 'status')
                        updateHandler(col.id, { status: e.target.value })
                      }}
                    >
                      {statusOptions.map((status) => {
                        return (
                          <MenuItem value={status} key={status}>
                            {status}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                ) : (
                  col.status
                )}
              </td>
              <td>
                {' '}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteHandler(col.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
