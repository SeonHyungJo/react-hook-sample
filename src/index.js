import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'

const list = [2, 434, 34, 24, 643, 123]

ReactDom.render(<App list={list} />, document.getElementById('root'))
