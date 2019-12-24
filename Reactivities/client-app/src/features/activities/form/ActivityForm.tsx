import React from 'react';
import { Segment, Form } from 'semantic-ui-react';

const ActivityForm = () => {
    return (
        <Segment>
            <Form>
                <Form.Input placeholder="Title" />
                <Form.TextArea rows={2} placeholder="Description" />
                <Form.Input placeholder="Category" />
                <Form.Input type='date' placeholder="Data" />
                <Form.Input placeholder="City" />
                <Form.Input placeholder="Vanue" />
            </Form>
        </Segment>
    )
};

export default ActivityForm;
