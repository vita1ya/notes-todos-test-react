import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom' 

import Todos from './Todos'

import { NotesContext } from '../context/notes'

const Note = ({ i, note, isEditable, isCreate, isActions }) => {
  const { setNote, notes, setNotes, editableInput, setEditableInput, setIsShowModalConfirm, setDeletableId } = useContext(NotesContext)

  const handleDelete = (isCreate, isNote, i, j) => {
    if (isCreate) {
      setNote({ ...note, todos: note.todos.filter((_, n) => n !== j) })
    }
    else {
      if (isNote) setNotes(notes.filter((_, j) => j !== i))
      else setNotes(notes.filter((note, n) => note.todos && n === i ? note.todos.splice(j, 1) : note))
    }
  }
  
  const handleOnChangeNote = e => {
    setNote({...note, name: e.target.value })
  }

  const openChangeMode = e => {
    const target = e.target.parentElement.parentElement

    setEditableInput(target.querySelector('span').textContent)
    
    document.querySelectorAll('.edit').forEach((item) => {
      if (target.parentElement.querySelector('.edit') === item) {
        item.style.display = 'block'
        item.getElementsByTagName('input')[0].focus()
      }
      else item.style.display = 'none'
    })
    document.querySelectorAll('.read').forEach((item) => target === item ? item.style.display = 'none' : item.style.display = 'block')
  }

  const closeChangeMode = () => {
    document.querySelectorAll('.edit').forEach((item) => item.style.display = 'none')
    document.querySelectorAll('.read').forEach((item) => item.style.display = 'block')

    setEditableInput('')
  }

  const saveNote = (i) => {
    setNotes(notes.filter((note, n) => n === i ? note.name = editableInput : note))
    closeChangeMode()
  }

  const openModalConfirm = (index) => {
    setIsShowModalConfirm(true)
    setDeletableId(index)
    document.body.style.overflow = 'hidden'
  }

  const handlePressEnter = (e, i) => {
    if (e.charCode === 13) saveNote(i)
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))

    // eslint-disable-next-line
  }, [notes])
  
  return (
    <div className='note'>
      {
        isCreate ?
          <input type='text' name='note' className='note__input' placeholder='Заметка' value={ note.name } onChange={ e => handleOnChangeNote(e) }/>
          : isEditable ?
              <div className='note__content'>
                <div className='read'>
                  <div className='note__read'>
                    <span>{ note.name }</span>
                    <button onClick={ e => openChangeMode(e) }>&#9998;</button>
                    <div className='note__delete' onClick={ () => openModalConfirm(i) }>&times;</div>
                  </div>
                </div>
                <div className='edit'>
                  <div className='note__edit'>
                    <input type='text' value={ editableInput } onChange={ e => setEditableInput(e.target.value) } onKeyPress={ e => handlePressEnter(e, i) } />
                    <button onClick={ () => saveNote(i) }>Сохранить</button>
                    <button onClick={ () => closeChangeMode() }>Отменить</button>
                  </div>
                </div>
              </div>
            : <div className='note__home'>
                <h3><NavLink to={`/${ i + 1 }`}>{ note.name }</NavLink></h3>
                <div className='note__delete' onClick={ () => openModalConfirm(i) }>&times;</div>
              </div>
      }
      <Todos notes={notes} setNote={ setNote } setNotes={ setNotes } note={ note } noteId={ i } isEditable={ isEditable } isCreate={ isCreate } openChangeMode={ openChangeMode } closeChangeMode={ closeChangeMode } handleDelete={ handleDelete } isActions={ isActions } />
    </div>
  )
}

export default Note
