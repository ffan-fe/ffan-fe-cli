import React, {Component} from 'react'
import {render} from 'react-dom'
import App from './App'

const data = {
  name : 'World'
}

if (window && document) {
  window.onload = () => render(<App {...data} />,
    document.getElementById('root'))
}
