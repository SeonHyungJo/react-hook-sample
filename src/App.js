import React from 'react'
import DiffMemo from './components/useHook/useHook'

const App = () => {
  const list = [2, 434, 34, 24, 643, 123]

  return (
    <div>
      <DiffMemo list={list}></DiffMemo>
    </div>
  )
}

export default App
