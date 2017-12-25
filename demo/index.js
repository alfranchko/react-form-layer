import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router} from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'
import App from './containers/AppContainer'

const history = createHashHistory()


render(<Router history={history}><App /></Router>, document.getElementById('application_root'))
