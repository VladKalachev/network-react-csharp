import { observable, action } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/Activities";
import agent from "../api/agent";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;

    @action loadingActivities = async() => {
        this.loadingInitial = true;

        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('.')[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error)
        }

        // agent.Activities.list()
        // .then(activities => {
        //   activities.forEach(activity => {
        //     activity.date = activity.date.split('.')[0];
        //     this.activities.push(activity);
        //   })
        // })
        // .catch(error => console.log(error))
        // .finally(() => this.loadingInitial = false);
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }

    @action setEditMode = () => {

    }
}

export default createContext(new ActivityStore())