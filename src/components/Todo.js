import React, { useContext } from 'react'
import { NotesContext } from '../context/notes'

const Todo = ({ isEditable, isCreate, i, todo, noteId, handleCompleteTodo, openChangeMode, closeChangeMode, handleDelete }) => {
  const { notes, setNotes, note, setNote, editableInput, setEditableInput } = useContext(NotesContext)

  const saveTodo = (isCreate, i, j) => {
    if (isCreate) setNote({ ...note, todos: note.todos.filter((todo, n) => n === j ? todo.name = editableInput : todo) })
    else setNotes(notes.filter((note, n) => note.todos && n === i ? note.todos[j].name = editableInput : note))

    closeChangeMode()
  }

  const handlePressEnter = (e, f, id, i) => {
    if (e.charCode === 13) saveTodo(f, id, i)
  }

  return (
    <li className='todo'>
      {
        isEditable ?
          <div className='todo__content'>
            <div className='read'>
              <div className='todo__read'>
                {
                  !isCreate ?
                    <span className={ todo.completed ? 'completed' : '' } onClick={ () => handleCompleteTodo(noteId, i) }>{ todo.name }</span>
                  : <span>{ todo.name }</span>
                }
                <button onClick={ e => openChangeMode(e) }>&#9998;</button>
                <div className='todo__delete' onClick={ () => handleDelete(isCreate, false, noteId, i) }>&times;</div>
              </div>
            </div>
            <div className='edit'>
              <div className='todo__edit'>
                <input type='text' value={ editableInput } onChange={ e => setEditableInput(e.target.value) } onKeyPress={ e => handlePressEnter(e, isCreate, noteId, i) } />
                <button onClick={ () => saveTodo(isCreate, noteId, i) }>Сохранить</button>
                <button onClick={ () => closeChangeMode() }>Отменить</button>
              </div>
            </div>
          </div>
        : <div className='read'>
            <span className={ todo.completed ? 'completed' : '' }>{ todo.name }</span>
          </div>
      }
    </li>
  )
}

export default Todo
