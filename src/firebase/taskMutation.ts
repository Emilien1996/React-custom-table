import { addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { ITask } from '../types/taskModel'
import { createCollection } from './config'

const taskCollectionRef = createCollection<ITask>('tasks')
export const taskMutate = async (task: Omit<ITask, 'id'>) => {
  await addDoc(taskCollectionRef, task)
}

export const taskUpdate = async (id: string, task: ITask) => {
  const taskDocRef = doc(taskCollectionRef, id)
  await updateDoc(taskDocRef, task)
}

export const taskDelete = async (id: string) => {
  const taskDocRef = doc(taskCollectionRef, id)
  await deleteDoc(taskDocRef)
}
