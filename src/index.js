import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore, StoreProvider, action } from 'easy-peasy';

import './assets/js/index';

// css
import './assets/css/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Pages
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


document.title = "Good luck :)"



const store = createStore({

  numberHold: 0,
  setNumberHold: action((state, payload) => {
    state.numberHold = payload;
  }),

  statusMuteSound: false,
  setStatusMuteSound: action((state, payload) => {
    state.statusMuteSound = payload;
  }),
  // statusRandomHoldNext: true,
  // setStatusRandomHoldNext: action((state, payload) => {
  //   state.statusRandomHoldNext = payload;
  // }),

  statusAddNewParticipant: false,
  setStatusAddNewParticipant: action((state, payload) => {
    state.statusAddNewParticipant = payload;
  }),

  statusRandomHoldNow: false,
  setStatusRandomHoldNow: action((state, payload) => {
    state.statusRandomHold = payload;
  }),


  
  statusOnRandomCutout: false,
  setStatusOnRandomCutout: action((state, payload) => {
    state.statusOnRandomCutout = payload;
  }),

  
  statusRandomCutoutFN: false,
  setStatusRandomCutoutFN: action((state, payload) => {
    state.statusRandomCutoutFN = payload;
  }),

  participantsHold: [],
  getParticipantHold: action((state, payload) => {
    state.participantsHold = JSON.parse(localStorage.getItem('participantsOnHold'));
  }),
  setParticipantHold: action((state, payload) => {
    state.participantsHold = payload;
    localStorage.setItem('participantsOnHold', JSON.stringify(state.participantsHold || []));
  }),
  addParticipantHold: action((state, payload) => {
    state.participantsHold.push(payload);
    localStorage.setItem('participantsOnHold', JSON.stringify(state.participantsHold));
  }),
  changeItemParticipantsHold: action((state, payload) => {
    state.participantsHold[payload.index] = payload.value;
    localStorage.setItem('participantsOnHold', JSON.stringify(state.participantsHold));
  }),
  removeItemParticipantsHoldByValue: action((state, payload) => {
    state.participantsHold = state.participantsHold.filter(item => item !== payload);
    localStorage.setItem('participantsOnHold', JSON.stringify(state.participantsHold));
  }),
  removeItemParticipantsHold: action((state, payload) => {
    state.participantsHold = state.participantsHold.filter((item, index) => index !== payload);
    localStorage.setItem('participantsOnHold', JSON.stringify(state.participantsHold));
  }),
  clearParticipantsHold: action((state, payload) => {
    state.participantsHold = [];
    localStorage.setItem('participantsOnHold', JSON.stringify(state.participantsHold));
  })
});



root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals