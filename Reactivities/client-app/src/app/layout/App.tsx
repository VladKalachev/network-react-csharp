import React, { useEffect, Fragment,useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboad';
import LoadingComponent from './LoadingComponent';
import ActivityStore from "../../stores/activityStore"
import { observer } from "mobx-react-lite";

const App = () => {

  /**
   * Store
   */
  const activityStore = useContext(ActivityStore);
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
        <ActivityDashboad />
      </Container> 
  </Fragment>
  );
}

export default observer(App);
