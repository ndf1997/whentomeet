import React from 'react';
import HeaderBar from '../../components/HeaderBar';
import MeetingDetails from '../../components/MeetingDetails';
import TimeTable from '../../components/TimeTable';

function MeetingPage() {
  return (
    <div className="MeetingPage">
      <HeaderBar />
      <MeetingDetails />
      <TimeTable />
    </div>
  );
}

export default MeetingPage;
