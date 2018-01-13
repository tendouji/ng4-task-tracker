export module TaskModal {
  export interface TaskRecord {
    id: number,
    assignedTo: number,
    category: number,
    completed: number,
    createdBy: number,
    dateCompleted: string,
    dateStarted: string,
    description: string,
    name: string,
    priority: number
  }
}
