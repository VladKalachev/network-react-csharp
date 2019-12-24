import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../../models/Activities';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboad';

const App = () => {

  /**
   * State
   */
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  /**
   * Select Activity
   * @param id Activity id
   */
  const hadnleSelectedActivity = (id: string) => {
      setSelectedActivity(activities.filter(a => a.id === id)[0]);
      setEditMode(false);
  };

  /**
   * Open Create Form Activity
   */
  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  /**
   * Create Activity
   * @param activity List Activity
   */
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  /**
   * Edit Activity
   * @param activity List Activity
   */
  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  /**
   * Effect
   */
  useEffect(() => {
    axios
    .get<IActivity[]>('http://localhost:5000/api/activities')
    .then(response => {
      let activities: IActivity[] = [];
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities);
    });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboad
          // list activities 
          activities={activities} 
          selectActivity={hadnleSelectedActivity} 
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          // create
          createActivity={handleCreateActivity}
          // edit
          editActivity={handleEditActivity}
         />
      </Container> 
  </Fragment>
  );
}

export default App;
