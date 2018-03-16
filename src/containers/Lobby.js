// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchForm from '../components/batches/CreateBatchForm.js'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/batches/${batchId}`)

  renderBatch = (batch, index) => {

    return (
      <MenuItem
        key={index}
        onClick={this.goToBatch(batch._id)}
        primaryText={"Batchnumber: " + batch.batchNumber + "- - - - - -" + "Amount of students: " + batch.students.length}
        secondaryText={`Period: ${batch.startDate.replace(/T.*/, "")} - ${batch.endDate.replace(/T.*/, "")}`} />
    )
  }


  render() {
    return (
      <div className="Lobby">
        <h1>Classes!</h1>
        <CreateBatchForm />
        <Paper className="paper">
          <Menu>
            {this.props.batches.map(this.renderBatch)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, subscribeToWebsocket, fetchStudents, push })(Lobby)
