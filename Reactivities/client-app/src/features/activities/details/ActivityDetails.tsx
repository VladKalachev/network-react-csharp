import React, { useContext, useEffect } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import ActivityStore from "../../../stores/activityStore"
import { observer } from 'mobx-react-lite';
import { RouteProps, RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
    const activityStore = useContext(ActivityStore);
    const { activity, openEditForm, cancelSelectedActivity, loadActivity, loadingInitial } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity]);

    // return <h1>Activity Details</h1>

    if(loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{activity!.title}</Card.Header>
            <Card.Meta>
                <span>{activity!.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity!.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    onClick={() => openEditForm(activity!.id)} 
                    basic 
                    color='blue' 
                    content="Edit"
                />
                <Button 
                    onClick={cancelSelectedActivity} 
                    basic 
                    color='grey' 
                    content="Cancel"
                />
            </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);
