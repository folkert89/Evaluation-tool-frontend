// src/components/batches/CreateStudentButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import {createStudent} from '../../actions/batches/create'

class CreateStudentForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    const { createStudent } = this.props
  }

  submitForm(event) {
    event.preventDefault()
    const newStudent = {
      name: this.refs.name.value,
      photo: this.refs.photo.value,
    }
    console.log('eerste batch' + this.props.batch)
    this.props.createStudent(this.props.batch, newStudent)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateStudentForm">
        <form
          onSubmit={this.submitForm.bind(this)}
        > <label style={{display: 'block'}}>
            Name:   <input type="text" ref="name" />
          </label>
          <label style={{display: 'block'}}>
            Photo:   <input type="text" ref="photo" />
          </label>
          <br/>
          <RaisedButton
            type="submit"
            label="Create Student"
            primary={true}
            icon={<StarIcon />} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createStudent })(CreateStudentForm)
