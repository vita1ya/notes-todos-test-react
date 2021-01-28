import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { NotesContext } from '../context/notes'

const ModalConfirm = () => {
  const history = useHistory()
  const { notes, setNotes, isShowModalConfirm, setIsShowModalConfirm, deletableId, setDeletableId } = useContext(NotesContext)

  const deleteNote = () => {
    setNotes(notes.filter((_, j) => j !== deletableId))

    closeModal()
    history.push('/')
  }

  const closeModal = () => {
    setDeletableId(null)
    setIsShowModalConfirm(false)

    document.body.style.overflow = 'auto'
  }

  return (
    <div className={ `modal ${ isShowModalConfirm ? 'show' : 'hide' }` }>
      <div className='modal__header'>
        <span>Подтверждение</span>
        <div className='modal__header__close' onClick={ () => closeModal() }>&times;</div>
      </div>
      <div className='modal__content'>
        Вы уверены, что хотите удалить заметку?
      </div>
      <div className='modal__footer'>
        <button className='modal__footer__save' onClick={ () => deleteNote() }>Да</button>
        <button className='modal__footer__cancel' onClick={ () => closeModal() }>Нет</button>
      </div>
    </div>
  )
}

export default ModalConfirm
