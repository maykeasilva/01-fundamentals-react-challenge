import { Trash } from '@phosphor-icons/react'
import styles from './task.module.css'

export interface TaskType {
  id: number
  content: string
  isComplete: boolean
}

interface TaskProps {
  task: TaskType
  onMarkComplete: (id: number) => void
  onDeleteTask: (id: number) => void
}

export function Task({ task, onMarkComplete, onDeleteTask }: TaskProps) {
  function handleMarkComplete() {
    onMarkComplete(task.id)
  }

  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  return (
    <div className={styles.task}>
      <input type='checkbox' onClick={handleMarkComplete} />

      <p className={task.isComplete ? styles.taskComplete : ''}>{task.content}</p>

      <button title='Deletar tarefa' onClick={handleDeleteTask}>
        <Trash size={16} weight='regular' />
      </button>
    </div>
  )
}
