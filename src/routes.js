// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Lobby,
  Batch,
  SignIn,
  Student,
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/batches" component={Lobby} />
        <Route exact path="/batches/:batchId" component={Batch} />
        <Route exact path="/batches/:batchId/students/:studentId" component={Student} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
