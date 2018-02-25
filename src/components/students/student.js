// src/components/batches/CreateBatchButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

class Student extends PureComponent {

  render() {
    const { student, key, onClick } = this.props

    let color = 'grey'
    if (student.evaluations.length>0) {
      color = student.evaluations[student.evaluations.length-1].evaluation
    }
    const Style = {
     display: 'flex',
     flexFlow: 'column wrap',
     float: 'left',
     width: '325px',
     margin: '20px',
     padding: '20px',
     backgroundColor: color,
    }

    if (!this.props.signedIn) return null

    return (
        <Paper style={Style} className="paper"
        onClick={onClick}>
            <img src={student.photo} alt='profile picture' width='100px' height='100px'/>
            <br/>
            {student.name}

        </Paper>

    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(Student)
