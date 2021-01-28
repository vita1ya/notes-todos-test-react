import React, { useContext, Fragment } from 'react'

import { NotesContext } from '../context/notes'

import Header from '../components/Header'
import Notes from '../components/Notes'
import ModalCreate from '../components/ModalCreate'
import ModalConfirm from '../components/ModalConfirm'

const Home = () => {
  const { isShowModalCreate, isShowModalConfirm } = useContext(NotesContext)

  return (
    <Fragment>
      <Header setIsShowCreateNoteButton={ true } />
      <section>
        <div className='container'>
          <Notes isEditable={ false } />
        </div>
      </section>
      <ModalCreate />
      <ModalConfirm />
      <div className='overlay' style={{ display: isShowModalCreate || isShowModalConfirm ? 'block' : 'none' }}></div>
    </Fragment>
  )
}

export default Home
