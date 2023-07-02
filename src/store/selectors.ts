import { tasksQuery } from '../firebase/taskQueries'
import { selector, atom } from 'recoil'

export const getTaskSelector = atom({
  key: 'taskSelector',
  default: selector({
    key: 'taskSelector/Default',
    get: async () => {
      try {
        const res = await tasksQuery()
        return res
      } catch (err) {
        console.log(err)
        return []
      }
    },
  }),
})
