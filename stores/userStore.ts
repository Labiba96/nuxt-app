import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  age: number
}

interface State {
  users: User[]
  loading: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    users: [],
    loading: false
  }),

  actions: {
    async fetchUsers(): Promise<void> {
      this.loading = true
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        this.users = data.map((user: User) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          age: Math.floor(Math.random() * 20 + 20) // Simulated age
        }))
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
