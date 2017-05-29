import React from 'react'
import routes from './routes'
import {renderRoutes} from 'react-router-config'

const App = () => (
    <div>
      {renderRoutes(routes)}
    </div>
)

export default App