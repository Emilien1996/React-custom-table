import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ReadOnlyProps } from '../../types/props'
import dayjs, { Dayjs } from 'dayjs'

interface IProps {
  value: Dayjs
  handleChange: (val: string, column: string) => void
  label: string
}
type DatePickerProps = ReadOnlyProps<IProps>

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  handleChange,
  label,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          disablePast
          label={label}
          value={value}
          onChange={(newValue) =>
            handleChange(dayjs(newValue).toISOString(), 'date')
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default DatePicker
