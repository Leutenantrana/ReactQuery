import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CounterContextProvider} from './CounterContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>,
)
