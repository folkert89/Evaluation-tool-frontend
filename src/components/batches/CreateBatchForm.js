// src/components/batches/CreateBatchButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createBatch from '../../actions/batches/create'

class CreateBatchForm extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    const { createBatch } = this.props
  }

  submitForm(event) {
    event.preventDefault()
    const newBatch = {
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value,
      batchNumber: this.refs.batchNumber.value,
    }
    this.props.createBatch(newBatch)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateBatchForm">
        <form
          onSubmit={this.submitForm.bind(this)}
        > <label style={{display: 'block'}}>
            Startdate:
            <input type="date" ref="startDate" />
          </label>
          <label style={{display: 'block'}}>
            Enddate:
            <input type="date" ref="endDate" />
          </label>
          <label style={{display: 'block'}}>
            Batchnumber:
            <input type="number" ref="batchNumber" />
          </label>
          <RaisedButton
            type="submit"
            label="Create Batch"
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

export default connect(mapStateToProps, { createBatch })(CreateBatchForm)
