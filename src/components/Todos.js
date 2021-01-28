import React, { Fragment, useContext } from 'react'
import Todo from './Todo'
import { NotesContext } from '../context/notes'

const Todos = ({ isEditable, isCreate, note, noteId, openChangeMode, closeChangeMode, handleDelete, isActions }) => {
  const { setNote, notes, setNotes } = useContext(NotesContext)
  
  const handleCompleteTodo = (i, j) => {
    setNotes(notes.filter((note, n) => {
      if (note.todos && n === i) note.todos[j].completed = !note.todos[j].completed

      return note
    }))
  }

  const handleAddTodo = e => {
    e.preventDefault()

    const todoInput = document.getElementsByName('todo')[0]

    if (todoInput.value !== '') {
      if (isCreate) setNote({...note, todos: [...note.todos, { name: todoInput.value, completed: false }] })
      else {
        setNotes(notes.filter((note, i) => {
          if (i === noteId) {
            if (!note.todos) note.todos = []
            note.todos.push({ name: todoInput.value, completed: false })
          }

          return note
        }))
      }
    }

    todoInput.value = ''
  }

  return (
    <Fragment>
      <ul className='todos'>
        {
          note.todos && note.todos.length !== 0 ?
            note.todos.map((todo, i) => (
              <Todo key={ i } isEditable={ isEditable } isCreate={ isCreate } i={ i } todo={ todo } noteId={ noteId } handleCompleteTodo={ handleCompleteTodo } openChangeMode={ openChangeMode } handleDelete={ handleDelete } closeChangeMode={ closeChangeMode } />
            ))
          : isCreate ? '' : <li className='todos__not-found'>Нет задач</li>
        }
      </ul>
      {
        isActions ?
          <form className='todo-add' onSubmit={ e => handleAddTodo(e) }>
            <input type='text' name='todo' className='todo-add__input' placeholder='Задача'/>
            <button type='submit'>Добавить</button>
          </form>
        : ''
      }
    </Fragment>
  )
}

export default Todos
