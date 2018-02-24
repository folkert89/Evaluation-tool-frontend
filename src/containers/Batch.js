import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Student from '../components/students/student.js'
import CreateStudentForm from '../components/batches/CreateStudentForm.js'
import CreateQuestion from '../components/batches/createQuestion.js'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

const studentShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  evaluations: PropTypes.arrayOf(PropTypes.string).isRequired,
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }),
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch && !batch.students[0].name) {
      this.props.fetchStudents(batch)
    }
  }
  goToStudent = studentId => event => this.props.push(`/batches/${this.props.batch._id}/students/${studentId}`)

  render() {
    const { batch } = this.props

    if (!batch) return null

    return (
      <div className="Batch">

        <h1> CLASS {batch.batchNumber}! </h1>
        <br/>
        <CreateStudentForm batch={batch}/>
        <CreateQuestion batch={batch}/>
        <br/>
        <div>
            {batch.students.map((student,index) => {
              return <Student key={index} id={index} student={student} onClick={this.goToStudent(student._id)}/>
            })}
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((g) => (g._id === match.params.batchId))[0]
  return {
    batch,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchStudents,
  push
})(Batch)
