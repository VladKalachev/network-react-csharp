import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../../models/Activities';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboad';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const hadnleSelectedActivity = (id: string) => {
      setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  useEffect(() => {
    axios
    .get<IActivity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    });
  }, []);


  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboad 
          activities={activities} 
          selectActivity={hadnleSelectedActivity} 
          selectedActivity={selectedActivity}
         />
      </Container> 
  </Fragment>
  );
}

export default App;
