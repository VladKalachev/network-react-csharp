import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../stores/activityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDashboad: React.FC = () => {
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

    if(activityStore.loadingInitial) 
        return <LoadingComponent content='Loading activities...'/>
        
    return (
        <Grid>
            <Grid.Column width={10}>
              <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
             <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboad);
