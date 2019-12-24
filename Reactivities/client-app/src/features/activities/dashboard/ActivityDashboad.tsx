import React from 'react'
import { Grid, List } from 'semantic-ui-react';
import { IActivity }from "../../../models/Activities"
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
}

const ActivityDashboad: React.FC<IProps> = ({ activities, selectActivity, selectedActivity }) => {
    return (
        <Grid>
            <Grid.Column width={10} >
              <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width={6} >
               { selectedActivity && <ActivityDetails activity={selectedActivity} />}
               <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboad;
