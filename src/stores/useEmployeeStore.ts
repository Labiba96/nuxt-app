import { defineStore } from 'pinia'
import { initialEmployees } from './data'
import type { Employee } from '@/types/employee'

const LOCAL_STORAGE_KEY = 'employees'

function loadFromLocalStorage(): Employee[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  return data ? JSON.parse(data) : initialEmployees
}

function saveToLocalStorage(employees: Employee[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees))
}

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
  }),

  actions: {
    loadEmployees() {
      const loaded = loadFromLocalStorage()
      this.employees = loaded
      saveToLocalStorage(loaded)
    },

    addEmployee(employee: Employee) {
      const exists = this.employees.some(e => e.ID === employee.ID)
      if (!exists) {
        this.employees.push(employee)
        saveToLocalStorage(this.employees)
      }
    },

    updateEmployee(updated: Employee) {
      const index = this.employees.findIndex(e => e.ID === updated.ID)
      if (index !== -1) {
        this.employees[index] = updated
        saveToLocalStorage(this.employees)
      }
    },

    deleteEmployee(id: number) {
      this.employees = this.employees.filter(e => e.ID !== id)
      saveToLocalStorage(this.employees)
    },
  },
})
