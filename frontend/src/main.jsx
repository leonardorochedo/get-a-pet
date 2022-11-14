import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'

// Reveal
import Zoom from 'react-reveal/Zoom';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Zoom>
      <App />
    </Zoom>
  </React.StrictMode>
)
