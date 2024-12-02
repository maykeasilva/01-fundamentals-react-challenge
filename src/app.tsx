import { useState, type ChangeEvent, type FormEvent } from 'react'
import { PlusCircle } from '@phosphor-icons/react'
import { Header } from './components/header'
import { Task, TaskType } from './components/task'
import clipboard from './assets/clipboard.svg'
import styles from './app.module.css'

export function App() {
  const [sequenceId, setSequenceId] = useState(1)
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const task: TaskType = {
      id: sequenceId,
      content: newTaskText,
      isComplete: false,
    }

    setTasks((state) => [...state, task])
    setSequenceId((state) => state + 1)
    setNewTaskText('')
  }
  
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function markComplete(taskId: number) {
    const taskListUpdated = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isComplete: !task.isComplete }
      }

      return { ...task }
    })

    setTasks(taskListUpdated)
  }

  function deleteTask(taskId: number) {
    const taskListWithoutRemoved = tasks.filter((task) => {
      return task.id !== taskId
    })

    setTasks(taskListWithoutRemoved)
  }

  const numberOfTasks = tasks.length
  const numberOfTasksComplete = tasks.filter((task) => task.isComplete).length

  const isTasksEmpty = tasks.length === 0
  const isTaskInputEmpty = newTaskText.length === 0
  
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <input
            type='text'
            placeholder='Adicione uma nova tarefa'
            value={newTaskText}
            onChange={handleNewTaskChange}
          />

          <button type='submit' disabled={isTaskInputEmpty}>
            <span>Criar</span>
            <PlusCircle size={20} weight='bold' />
          </button>
        </form>

        <div>
          <div className={styles.taskStatus}>
            <strong>Tarefas criadas <span>{numberOfTasks}</span></strong>
            <strong>Tarefas concluídas
              <span>
                {
                  isTasksEmpty
                    ? (<>{numberOfTasksComplete}</>)
                    : (<>{numberOfTasksComplete} de {numberOfTasks}</>)
                }
              </span>
            </strong>
          </div>

          <div className={styles.taskList}>
            {
              isTasksEmpty ? (
                <div className={styles.taskEmpty}>
                  <img src={clipboard} alt='Clipboard Icon' />
                  
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
              ) : (
                tasks.map((task) => {
                  return (
                    <Task
                      key={task.id}
                      task={task}
                      onMarkComplete={markComplete}
                      onDeleteTask={deleteTask}
                    />
                  )
                })
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
