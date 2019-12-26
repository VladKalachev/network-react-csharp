import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from "../../../stores/activityStore"

const ActivityDashboad: React.FC = () => {
    /**
    * Store
    */
    const activityStore = useContext(ActivityStore);
    const {editMode, activity} = activityStore;
    return (
        <Grid>
            <Grid.Column width={10} >
              <ActivityList />
            </Grid.Column>
            <Grid.Column width={6} >
               { activity && !editMode && (
                <ActivityDetails /> )}
               { editMode && (
                <ActivityForm
                    key={(activity && activity.id) || 0}
                    activity={activity!}
               /> )}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboad);
