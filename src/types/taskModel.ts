import { Timestamp } from 'firebase/firestore'

export interface ITask {
  id: string
  name: string
  description: string
  date: Timestamp
  status: string
  taskID: string
}
