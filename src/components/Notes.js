import React, { useContext } from 'react'
import Note from './Note'
import { NotesContext } from '../context/notes'

const Notes = ({ isEditable }) => {
  const { notes } = useContext(NotesContext)
  
  return (
    <div className='notes'>
      {
        notes && notes.length !== 0 ?
        notes.map((note, i) => (
          <Note key={ i } i={ i } note={ note } isEditable={ isEditable } isCreate={ false } />
        ))
      : <div className='notes__not-found'>Заметки не найдены</div>
      }
    </div>
  )
}

export default Notes
