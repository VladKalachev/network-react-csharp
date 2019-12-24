import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'

const ActivityDetails = () => {
    return (
        <Card fluid>
            <Image src='/assets/placeholder.png' wrapped ui={false} />
            <Card.Content>
            <Card.Header>Title</Card.Header>
            <Card.Meta>
                <span>Date</span>
            </Card.Meta>
            <Card.Description>
                Description
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
