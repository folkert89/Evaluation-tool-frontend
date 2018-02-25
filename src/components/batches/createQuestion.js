// src/components/batches/CreateStudentButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Student from '../students/student.js'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'

class CreateQuestion extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  constructor(props) {
  super(props);
  this.state = {
    questionStudent: null
  };
}

  preventEvent = batch => event => {
    this.getColors(batch)
  }

  getColors = batch => {
    console.log(batch.students)
    let green = []
    let red = []
    let orange = []

    batch.students.map(student => {
      if (!student.evaluations.length>0) {
        red.push(student)
      } else if (student.evaluations[student.evaluations.length-1].evaluation === "green") {
        green.push(student)
      } else if (student.evaluations[student.evaluations.length-1].evaluation === "red") {
        red.push(student)
      } else {
        orange.push(student)
      }
    })

    this.getStudent(green, red, orange)
  }

  getStudent = (green, red, orange) => {
    const randNumb = Math.floor(Math.random() * 100) + 1;
    console.log(randNumb)
    if (randNumb > 51) {
      this.conditions(red)
    } else if (randNumb > 18 && randNumb <=51) {
      this.conditions(orange)
    } else {
      this.conditions(green)
    }
  }

  conditions = color => {
    let chosenStudent = {}
    if (color.length >= 1) {
      const randIndex = Math.floor(Math.random() * color.length);
      chosenStudent = color[randIndex]
    } else {
      return this.getColors(this.props.batch)
    }
    console.log(chosenStudent)
    this.setState({questionStudent: chosenStudent})
  }

  goToStudent = studentId => event => this.props.push(`/batches/${this.props.batch._id}/students/${studentId}`)

  render() {

    if (!this.props.signedIn) return null
    const student = this.state.questionStudent

    return (
      <div className="CreateStudentForm">
          <RaisedButton
            type="submit"
            onClick={this.preventEvent(this.props.batch)}
            label="Next question"
            primary={true}
            icon={<StarIcon />} />

            {student?
              <Student student={student} onClick={this.goToStudent(student._id)}/>
              : ''}

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps,{push})(CreateQuestion)
