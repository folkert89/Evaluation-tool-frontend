// src/actions/games/create.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export default (newBatch) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    api.post('/batches', newBatch)
      .then(() => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const createStudent = (batch, newStudent) => {
  return (dispatch) => {
    console.log(batch, newStudent)
    dispatch({ type: APP_LOADING })
    api.post(`/batches/${batch._id}/students`, newStudent)
      .then(() => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({

          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const CreateEvaluation = (batch, student, evaluation) => {
  return (dispatch) => {
    console.log(batch._id, student._id, evaluation)
    dispatch({ type: APP_LOADING })
    api.post(`/batches/${batch._id}/students/${student._id}/evaluations`, evaluation)
      .then(() => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({

          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
