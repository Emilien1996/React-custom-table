import { Timestamp, getDocs } from 'firebase/firestore'
import { ITask } from '../types/taskModel'
import { createCollection } from './config'

const taskCollectionRef = createCollection<ITask>('tasks')
export const tasksQuery = async () => {
  const res = await getDocs(taskCollectionRef)

  const data = res.docs.map((doc) => {
    const collectionData = doc.data()
    const convertFirebaseDate = new Timestamp(
      collectionData.date.seconds,
      collectionData.date.nanoseconds,
    )
    const isoDate = convertFirebaseDate.toDate().toISOString()

    return {
      ...collectionData,
      date: isoDate,
      id: doc.id,
    }
  })
  return data
}
