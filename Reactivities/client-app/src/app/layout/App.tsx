import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../../models/Activities';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboad';
import agent from '../../api/agent';
import LoadingComponent from './LoadingComponent';

const App = () => {

  /**
   * State
   */
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

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
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  /**
   * Edit Activity
   * @param activity List Activity
   */
  const handleEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  }

  /**
   * Delete Activity
   * @param id 
   */
  const handleDeleteActivity = (id: string) => {
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }); 
  }

  /**
   * Effect
   */
  useEffect(() => {
    agent.Activities.list()
    .then(response => {
      let activities: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities);
    }).then(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponent content='Loading activities...'/>
  
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
          // delete
          deleteActivity={handleDeleteActivity}
         />
      </Container> 
  </Fragment>
  );
}

export default App;
