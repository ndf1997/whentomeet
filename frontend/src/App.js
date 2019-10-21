import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MeetingPage from './pages/meeting/MeetingPage';
import MeetingForm from './pages/meetingform/MeetingForm';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/create" component={MeetingForm} />
        <Route path="/meeting/:meeting_id" component={MeetingPage} />
      </div>
    </Router>
  );
}

export default App;