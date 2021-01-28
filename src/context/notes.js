import React, { useState } from 'react'

export const NotesContext = React.createContext()

export const NotesProvider = ({ children }) => {
  const defaultNote = {
    name: '',
    todos: []
  }

  const [notes, setNotes] = useState(localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [])
  const [note, setNote] = useState(defaultNote)
  const [editableInput, setEditableInput] = useState('')
  const [isShowModalCreate, setIsShowModalCreate] = useState(false)
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
  const [deletableId, setDeletableId] = useState(null)

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        defaultNote,
        note,
        setNote,
        editableInput, 
        setEditableInput,
        isShowModalCreate, 
        setIsShowModalCreate,
        isShowModalConfirm, 
        setIsShowModalConfirm,
        deletableId,
        setDeletableId
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}