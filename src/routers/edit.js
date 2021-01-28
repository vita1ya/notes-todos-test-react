import React, { Fragment, useContext } from 'react'
import { useParams } from 'react-router-dom' 

import { NotesContext } from '../context/notes'

import Note from '../components/Note'
import Header from '../components/Header'
import ModalConfirm from '../components/ModalConfirm'

const Edit = () => {
  const { id } = useParams()
  const { notes, isShowModalCreate, isShowModalConfirm } = useContext(NotesContext)

  return (
    <Fragment>
      <Header setIsShowCreateNoteButton={ false } />
      <section>
        <div className='container'>
          <Note i={ id - 1 } note={ notes[id -  1] } isEditable={ true } isCreate={ false } isActions={ true } />
        </div>
      </section>
      <ModalConfirm />
      <div className='overlay' style={{ display: isShowModalCreate || isShowModalConfirm ? 'block' : 'none' }}></div>
    </Fragment>
  )
}

export default Edit
