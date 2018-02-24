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

  submitQuestion = students => event => {

    // students.map{student => (
    //
    // )}
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateStudentForm">
          <RaisedButton
            type="submit"
            onClick={this.submitQuestion(this.props.students)}
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
