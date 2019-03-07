import { ADD_WEBHOOK } from './types'
import firebase from '../config/firebase'
var db = firebase.firestore()

export const addWebhook = webhookURL => {
  return dispatch => {
    const accessToken = window.localStorage.getItem('token')

    let configData = {
      url: 'https://us-central1-guthubdashboard.cloudfunctions.net/events',
      content_type: 'json'
    }

    console.log(webhookURL)

    let data = { name: 'web', config: configData }

    window
      .fetch(webhookURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: 'token ' + accessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: ADD_WEBHOOK, payload: data })

        // Add a new document in collection "cities"
        db.collection("users").doc("24423").set({
          hookID: data.id
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });


        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const deleteWebhook = webhookURL => {
  return dispatch => { }
}
