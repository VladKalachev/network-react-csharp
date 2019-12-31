import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activities';
import {v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import {category} from '../../../app/common/options/categoryOptions';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
  }) => {
    const activityStore = useContext(ActivityStore);
    const {
      submitting,
      activity: initialFormState,
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
  
    useEffect(() => {
      if (match.params.id && activity.id.length === 0) {
        loadActivity(match.params.id).then(
          () => initialFormState && setActivity(initialFormState)
        );
      }
      return () => {
        clearActivity();
      };
    }, [
      loadActivity,
      clearActivity,
      match.params.id,
      initialFormState,
      activity.id.length
    ]);
  
    const handleFinalFormSubmit = (values: any) => {
      console.log(values);
    };

    // const handleSubmit = () => {
    //   if (activity.id.length === 0) {
    //     let newActivity = {
    //       ...activity,
    //       id: uuid()
    //     };
    //     createActivity(newActivity).then(() =>
    //       history.push(`/activities/${newActivity.id}`)
    //     );
    //   } else {
    //     editActivity(activity).then(() =>
    //       history.push(`/activities/${activity.id}`)
    //     );
    //   }
    // };
  
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              onSubmit={handleFinalFormSubmit}
              render={({handleSubmit}) => (
             <Form onSubmit={handleSubmit}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={activity.title}
                  component={TextInput}
                  />
                <Field
                  name='description'
                  placeholder='Description'
                  value={activity.description}
                  rows={3}
                  component={TextAreaInput}
                />
              <Field
                component={SelectInput}
                options={category}
                name='category'
                placeholder='Category'
                value={activity.category}
              />
              <Field
                component={TextInput}
                name='date'
                type='datetime-local'
                placeholder='Date'
                value={activity.date}
              />
              <Field
                component={TextInput}
                name='city'
                placeholder='City'
                value={activity.city}
              />
              <Field
                component={TextInput}
                name='venue'
                placeholder='Venue'
                value={activity.venue}
              />
              <Button
                loading={submitting}
                floated='right'
                positive
                type='submit'
                content='Submit'
              />
              <Button
                onClick={() => history.push('/activities')}
                floated='right'
                type='button'
                content='Cancel'
              />
            </Form>
           )}
          />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  };
  
  export default observer(ActivityForm);