import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../models/Activities';
import {v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from "../../../stores/activityStore";
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {  
    /**
     * Store
     */
    const activityStore = useContext(ActivityStore);
    const {
        createActivity, 
        editActivity, 
        submitting, 
        cancelFromOpen, 
        activity: initializFormState, 
        loadActivity,
        clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    /**
     * Effect
     */
    useEffect(() => {
        if(match.params.id){
            loadActivity(match.params.id).then(() => initializFormState && setActivity(initializFormState));
        }
        return () => {
            clearActivity()
        }
    }, [
        clearActivity,
        initializFormState,
        loadActivity,
        match.params.id
    ]);

    const handleSubmit = () => {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
        console.log(activity);
    }

    /**
     * Handle Change
     * @param event 
     */
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({...activity, [name]: value});
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input 
                    onChange={handleInputChange} 
                    name='title' 
                    placeholder="Title" 
                    value={activity.title}
                />
                <Form.TextArea 
                    onChange={handleInputChange} 
                    rows={2} 
                    name='description' 
                    placeholder="Description" 
                    value={activity.description} 
                />
                <Form.Input
                    onChange={handleInputChange} 
                    placeholder="Category"
                    name='category'
                    value={activity.category} 
                />
                <Form.Input
                    onChange={handleInputChange} 
                    type='datetime-local'
                    name='date'
                    placeholder="Data" 
                    value={activity.date} 
                />
                <Form.Input
                    onChange={handleInputChange} 
                    placeholder="City"
                    name='city'
                    value={activity.city} 
                />
                <Form.Input
                    onChange={handleInputChange} 
                    placeholder="Vanue"
                    name='venue'
                    value={activity.venue} 
                />
                <Button 
                    floated='right'
                    loading={submitting}
                    positive 
                    type='submit'
                    content='Submit'
                />
                <Button 
                    onClick={cancelFromOpen} 
                    floated='right' 
                    type='button' 
                    content='Cancle'
                 />
            </Form>
        </Segment>
    )
};

export default observer(ActivityForm);
