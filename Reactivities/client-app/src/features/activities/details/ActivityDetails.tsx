import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity }from "../../../models/Activities"
import ActivityStore from "../../../stores/activityStore"
import { observer } from 'mobx-react-lite';
interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({ setEditMode, setSelectedActivity }) => {

    /**
    * Store
    */
    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity } = activityStore;
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
                    onClick={() => setEditMode(true)} 
                    basic 
                    color='blue' 
                    content="Edit"
                />
                <Button 
                    onClick={() => setSelectedActivity(null)} 
                    basic 
                    color='grey' 
                    content="Cancel"
                />
            </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);
