import React, { useEffect, Fragment,useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboad from '../../features/activities/dashboard/ActivityDashboad';
import LoadingComponent from './LoadingComponent';
import ActivityStore from "../../stores/activityStore"
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({location}) => {
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
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={ActivityDashboad} />
        <Route path='/activities/:id' component={ActivityDetails} />
        <Route 
          key={location.key} 
          path={['/createActivity', '/manage/:id']} 
          component={ActivityForm}
         />
      </Container> 
  </Fragment>
  );
}

export default withRouter(observer(App));
