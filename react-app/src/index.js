import React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Root from './containers/Root'

import Typography from 'typography'
import theme from 'typography-theme-github'
import './index.css'

const typography = new Typography(theme)
typography.injectStyles()


global.TWEEN = require('@tweenjs/tween.js')
function animate(time) {
    requestAnimationFrame(animate);
    global.TWEEN.update(time);
}
requestAnimationFrame(animate);


render(<Root />, document.getElementById('root'))

registerServiceWorker()
