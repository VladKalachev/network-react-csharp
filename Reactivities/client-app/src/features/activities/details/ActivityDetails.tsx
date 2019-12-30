import React, { useContext, useEffect } from 'react'
import { Card, Image, Button, Grid } from 'semantic-ui-react'
import ActivityStore from "../../../app/stores/activityStore"
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { 
        activity, 
        loadActivity, 
        loadingInitial
     } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id).catch(() => {
          history.push('/notfound');
        });
    }, [loadActivity, match.params.id, history]);

    if(loadingInitial) 
      return <LoadingComponent content='Loading activity...' />

    if(!activity)
      return <h2>Activity not found</h2>

    return (
        <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar />
        </Grid.Column>
      </Grid>
    )
}

export default observer(ActivityDetails);
