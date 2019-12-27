import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/Activities";
import agent from "../api/agent";

configure({enforceActions: 'always'});

class ActivityStore {

    @observable actitivyRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable activity: IActivity | null = null ;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.actitivyRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    };

    @action loadingActivities = async() => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities',() => {
                 activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.actitivyRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('loading activities error',() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity){
             this.activity = activity;
        }else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.deteils(id);
                runInAction('getting activity', ()=> {
                    this.activity = activity;
                    this.loadingInitial = false;
                });
            } catch (error) {
                runInAction('get activity error', ()=> {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    }

    @action clearActivity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
        return this.actitivyRegistry.get(id);
    } 

    /**
     * Create Activity
     * @param activity List Activity
     */
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('create activity',() => {
                this.actitivyRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            });
            
        } catch (error) {
            runInAction('create activity error',() => {
                this.submitting = false;
            });
            console.log(error)
        };
    };

    /**
     * Edit Activity
     * @param activity List Activity
     */
    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('edit activity',() => {
                this.actitivyRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
                this.submitting = false;
            });
           
        } catch (error) {
            runInAction('edit activity error',() => {
                this.submitting = false;
            });
            console.log(error)
        };
    };

    /**
     * Delete Activity
     * @param id 
     */
    @action deleteActivity = async(event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('delete activity', () => {
                this.actitivyRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
           
        } catch (error) {
            runInAction('delete activity error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }
    }

    /**
     * Open Create Form Activity
     */
    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = null;
    }

    /**
     * Open Edit Form Activity
     */
    @action openEditForm = (id: string) => {
        this.activity = this.actitivyRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.activity = null;
    }

    @action cancelFromOpen = () => {
        this.editMode = false;
    }

    @action selectActivity = (id: string) => {
        this.activity = this.actitivyRegistry.get(id);
        this.editMode = false;
    };

}

export default createContext(new ActivityStore())