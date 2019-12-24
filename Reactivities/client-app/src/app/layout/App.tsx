import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivities } from '../../models/Activities';
import NavBar from '../../features/nav/NavBar';

const App = () => {

  const [activities, setActivities] = useState<IActivities[]>([])

  useEffect(() => {
    axios.get<IActivities[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    });
  }, [])

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
         <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container> 
  </Fragment>
  );
}

export default App;
