import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import {  push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import Evaluation from '../components/students/evaluations.js'
import Paper from 'material-ui/Paper'

class Student extends PureComponent {

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const { batchId, studentId } = this.props.match.params


    if (!batch) { fetchOneBatch(batchId) }

    subscribeToWebsocket()
    //
  }

  componentWillReceiveProps(nextProps) {

    const { student, batch } = nextProps

    if (batch){
      const student = batch.students.filter((s) => (s._id === this.props.match.params.studentId))[0]
      this.setState(student)
    }
  }

  renderEvaluations = (evaluation, index) => {
    return (
    <Evaluation key={index} eval={evaluation} />
  )}

  render() {

    const { batch } = this.props

    let student = ""
    let evaluations = []
    // if (!student && match) return null
    if (batch){
      student = batch.students.filter((s) => (s._id === this.props.match.params.studentId))[0]
      evaluations = student.evaluations

    }

    return (
      <div className="Student">

        {student? <img alt="Profile Picture" height="150" width="150" src={student.photo }></img> : ''}
        {student? <h2>{student.name }</h2>: ''}
        {evaluations.length > 0 ?
          <div>
              {evaluations.map((evaluation,index) => {
                return <Evaluation key={index} evals={evaluation} />
              })}
          </div> : ''}

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((g) => (g._id === match.params.batchId))[0]
  const student = batch && batch.students.filter((s) => (s._id === match.params.studentId))[0]
  return {
    batch,
    student,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchStudents
})(Student)
