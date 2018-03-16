// src/components/batches/CreateStudentButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import {CreateEvaluation} from '../../actions/batches/create'

class CreateEvaluationForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  submitForm(event) {
    event.preventDefault()
    const newEvaluation = {
      color: this.refs.color.value,
      date: this.refs.date.value,
      remark: this.refs.remark.value,
    }
    
    this.props.CreateEvaluation(this.props.batch, this.props.student, newEvaluation)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateEvaluationForm" style={{clear: 'left'}}>
        <form
          onSubmit={this.submitForm.bind(this)}
        > <label style={{display: 'block'}}>
            Color:   <input type="text" ref="color" placeholder="type red, orange or green"/>
          </label>
          <label style={{display: 'block'}}>
              date:
              <input type="date" ref="date"/>
          </label>
          <label style={{display: 'block'}}>
            Remark:   <input type="text" ref="remark" />
          </label>
          <br/>
          <RaisedButton
            type="submit"
            label="Create Evaluation"
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

export default connect(mapStateToProps, { CreateEvaluation })(CreateEvaluationForm)
