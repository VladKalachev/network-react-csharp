import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../../models/Activities';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboad';
import agent from '../../api/agent';
import LoadingComponent from './LoadingComponent';
import ActivityStore from "../../stores/activityStore"
import { observer } from "mobx-react-lite";

const App = () => {

  /**
   * Store
   */
  const activityStore = useContext(ActivityStore);
  /**
   * State
   */
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmittiong] = useState(false);
  const [target, setTarget] = useState('');

  /**
   * Edit Activity
   * @param activity List Activity
   */
  const handleEditActivity = (activity: IActivity) => {
    setSubmittiong(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmittiong(false));
  }

  /**
   * Delete Activity
   * @param id 
   */
  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmittiong(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmittiong(false)); 
  }

  /**
   * Effect
   */
  useEffect(() => {
      activityStore.loadingActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

  return (
    <Fragment>
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboad
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          // edit
          editActivity={handleEditActivity}
          // delete
          deleteActivity={handleDeleteActivity}
          submittiong={submitting}
          target={target}
         />
      </Container> 
  </Fragment>
  );
}

export default observer(App);
