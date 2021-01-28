import React, { useContext } from 'react'

import { NotesContext } from '../context/notes'

import Note from '../components/Note'

const ModalCreate = () => {
  const { defaultNote, notes, setNotes, note, setNote, isShowModalCreate, setIsShowModalCreate } = useContext(NotesContext)

  const handleSave = () => {
    if (note.name === '') return
    
    setNotes([...notes, note])

    handleCancel()
  }

  const handleCancel = () => {
    setIsShowModalCreate(false)
    document.getElementsByName('todo')[0].value = ''
    setNote(defaultNote)
    
    document.body.style.overflow = 'auto'
  }

  return (
    <div className={ `modal ${ isShowModalCreate ? 'show' : 'hide' }` }>
      <div className='modal__header'>
        <span>Создать заметку</span>
        <div className='modal__header__close' onClick={ () => setIsShowModalCreate(false) }>&times;</div>
      </div>
      <div className='modal__content'>
        <Note i={ 0 } note={ note } isEditable={ true } isCreate={ true } isActions={ true } />
      </div>
      <div className='modal__footer'>
        <button className='modal__footer__save' onClick={ () => handleSave() }>Сохранить</button>
        <button className='modal__footer__cancel' onClick={ () => handleCancel() }>Отменить</button>
      </div>
    </div>
  )
}

export default ModalCreate
