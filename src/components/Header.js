import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom' 

import { NotesContext } from '../context/notes'

const Header = ({ setIsShowCreateNoteButton }) => {
  const { setIsShowModalCreate } = useContext(NotesContext)

  const openModal = () => {
    setIsShowModalCreate(true)

    document.body.style.overflow = 'hidden'
  }

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__content'>
          <h1><NavLink to='/'>Заметки</NavLink></h1>
          { setIsShowCreateNoteButton ? <button className='header__content__button' onClick={ () => openModal() }>Создать заметку</button> : '' }
        </div>
      </div>
    </header>
  )
}

export default Header
