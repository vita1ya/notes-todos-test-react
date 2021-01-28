import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import { NotesProvider } from './context/notes'

import './App.sass'

const Home = lazy(() => import('./routers/home'))
const Edit = lazy(() => import('./routers/edit'))
const NotFound = lazy(() => import('./routers/notFound'))

const App = () => {
  return (
    <NotesProvider>
      <Suspense fallback={
        <div className='loader'>Загрузка...</div> 
      }>
        <Router>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/:id(\d+)' component={ Edit } />
            <Route path='*' component={ NotFound }/>
          </Switch>
        </Router>
      </Suspense>
    </NotesProvider>
  )
}

export default App
