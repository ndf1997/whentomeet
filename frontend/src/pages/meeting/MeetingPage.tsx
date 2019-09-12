import React from 'react';
import Grid from '@material-ui/core/Grid';
import HeaderBar from '../../components/HeaderBar';
import MeetingDetails from '../../components/MeetingDetails';
import TimeTable from '../../components/TimeTable';

function MeetingPage() {
  return (
    <div className="MeetingPage">
      <HeaderBar />
      <MeetingDetails />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TimeTable />
        </Grid>
        <Grid item xs={6}>
          <TimeTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default MeetingPage;
