import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { IActivity }from "../../../models/Activities"

interface IProps {
    activity: IActivity;
}

const ActivityDetails: React.FC<IProps> = ({ activity }) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='blue' content="Edit" />
                <Button basic color='grey' content="Cancel" />
            </Card.Content>
      </Card>
    )
}

export default ActivityDetails
