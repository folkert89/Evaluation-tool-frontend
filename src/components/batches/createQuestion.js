// src/components/batches/CreateStudentButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'

class CreateQuestion extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  preventEvent = batch => event => {
    console.log(batch)
    this.getColors(batch)
  }

  getColors = batch => {

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
    console.log(green)
    console.log(red)
    console.log(orange)
    const randNumb = Math.floor(Math.random() * 100) + 1;
    console.log(randNumb)
    if (randNumb > 51) {
      this.conditions(red)
    } else if (randNumb > 18 && randNumb <=51) {
      console.log(orange)
      this.conditions(orange)
    } else {
      this.conditions(green)
    }
  }

  conditions = color => {
    let chosenStudent = {}
    if (color.length > 1) {
      const randIndex = Math.floor(Math.random() * color.length);
      chosenStudent = color[randIndex]
    } else if (color.length == 1) {
      chosenStudent = color
      console.log('minder', color)
    } else {
      console.log(this.props.batch)
      this.getColors(this.props.batch)
    }
    console.log(chosenStudent)
  }


  render() {

    if (!this.props.signedIn) return null

    return (
      <div className="CreateStudentForm">
          <RaisedButton
            type="submit"
            onClick={this.preventEvent(this.props.batch)}
            label="Next question"
            primary={true}
            icon={<StarIcon />} />

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(CreateQuestion)
