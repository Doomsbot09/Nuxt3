import { defineStore } from "pinia";

interface TaskData {
    task_name: string;
    description: string;
    time_left: number;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    status: string;
}

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => {
        return {
            table_headers: ['Task Name', 'Description', 'Time Left', 'Start Date', 'End Date', 'Created At', 'Status', 'Actions'],
            task_data: [] as TaskData[] | never,
        };
    },
    actions: {

        create() {
            //Dynamic Endpoints
        },
        async get(endpoint: string) {
            const response: any = await $fetch(`https://demo1675767.mockable.io/${endpoint}`);
            console.log('resp data', response.data)

            if (response) {
                this.task_data = response.data
            }
        },
        update() {
            //Dynamic Endpoints
        },
        delete() {
            //Dynamic Endpoints
        },
    },
});

export const useEventEmitter = defineStore({
    id: 'event',
    state: () => {
        return {
            formState: { 
                isValid: false, 
                action: '' 
            },
            spinnerState: { 
                isLoading: false 
            },
            toastState: { 
                type: '', 
                message: '' 
            },
            modalState: {
                state: false,
                action: "",
                title: "",
                btnOkName: "",
                btnStatus: ""
            },
            data: { 
                trigger: false, action: '' 
            }
        }
    },
    actions: {
        triggerEvent(event: any) {
            this.data.trigger = !this.data.trigger
            this.data.action = event.action
        },
        showToaster(event: any) {
            this.toastState.type = event.type
            this.toastState.message = event.message
        
            setTimeout(() => {
                this.toastState.type = ''
                this.toastState.message = ''
            }, 2000);
        },
        toggleModal(event: string) {
            switch (event) {
                case 'create':
                    this.modalState.state = !this.modalState.state
                    this.modalState.action = "create";
                    this.modalState.title = "Create Task";
                    this.modalState.btnOkName = "Create";
                    this.modalState.btnStatus = "success";
                break;
                case 'delete':
                    this.modalState.state = !this.modalState.state
                    this.modalState.action = "delete";
                    this.modalState.title = "Delete Task";
                    this.modalState.btnOkName = "Delete";
                    this.modalState.btnStatus = "danger";
                break;
                case 'update':
                    this.modalState.state = !this.modalState.state
                    this.modalState.action = "update";
                    this.modalState.title = "Edit Task";
                    this.modalState.btnOkName = "Save";
                    this.modalState.btnStatus = "success";
                break;
                default: 
                    this.modalState.state = false
                    this.modalState.action = "";
                    this.modalState.title = "";
                    this.modalState.btnOkName = "";
                    this.modalState.btnStatus = "";
            }
        }
    }
})