import React, { useState, useEffect } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';

const App = () => {

  const [values, setValues] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/values').then(response => {
      setValues(response.data);
    });
  }, [setValues])

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {values.map((value: any) => (
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
  </div>
  );
}

export default App;
