import React, { SyntheticEvent, useContext } from 'react'
import { Grid } from 'semantic-ui-react';
import { IActivity }from "../../../models/Activities"
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from "../../../stores/activityStore"

interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    target: string;
    submittiong: boolean;
}

const ActivityDashboad: React.FC<IProps> = ({
    setEditMode,
    setSelectedActivity,
    editActivity,
    deleteActivity,
    submittiong,
    target
 }) => {

    /**
    * Store
    */
    const activityStore = useContext(ActivityStore);
    const {editMode, selectedActivity} = activityStore;
    return (
        <Grid>
            <Grid.Column width={10} >
              <ActivityList
                deleteActivity={deleteActivity}
                submittiong={submittiong}
                target={target}
              />
            </Grid.Column>
            <Grid.Column width={6} >
               { selectedActivity && !editMode && (
                <ActivityDetails
                    setEditMode={setEditMode} 
                    setSelectedActivity={setSelectedActivity}
               /> )}
               { editMode && (
                <ActivityForm
                    key={(selectedActivity && selectedActivity.id) || 0}
                    setEditMode={setEditMode} 
                    activity={selectedActivity}
                    editActivity={editActivity}
                    submittiong={submittiong}
               /> )}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboad);
