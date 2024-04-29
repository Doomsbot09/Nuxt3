import { defineStore } from "pinia";

interface CreateTask {
    id: number;
    task_name: string;
    description: string;
    time_left: number;
    starts_at: Date;
    ends_at: Date;
    createdAt: Date;
    status: string;
}

interface UpdateTask {
    id: number;
    task_name: string;
    description: string;
    starts_at: string;
    ends_at: string;
}

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => {
        return {
            base_url: 'https://12e4d0vdb9.execute-api.us-east-1.amazonaws.com/sandbox',
            table_headers: ['Task Name', 'Description', 'Time Left', 'Start Date', 'End Date', 'Created At', 'Status', 'Actions'],
            task_data: [] as CreateTask[] | never,
            pagination: {
                page: 1,
                pageSize: 5,
                total: 0,
                isLoading: true
            }
        };
    },
    actions: {
        async create(endpoint: string, payload: object) {
            try {
                const response: any = await $fetch(`${this.base_url}/${endpoint}`, {
                    method: `POST`,
                    body: payload
                })

                const mappedData = {
                    ...response.data,
                    status: 'ongoing'
                }

                const newData = _addToTable(this.task_data)
                if (newData) this.task_data.push(mappedData)
                return { status: true, data: response.data, message: response.message }
            } catch (error) {
                return { status: false, message: 'Something went wrong' }
            }
        },
        async get(endpoint: string) {
            const response: any = await $fetch(`https://demo1675767.mockable.io/tasks`);
            
            if (response) {
                this.task_data = response.data
            }
        },
        async update(endpoint: string, payload?: any) {
            try {
                const response: any = await $fetch(`${this.base_url}/${endpoint}`, {
                    method: 'PUT',
                    body: payload
                })

                const newData = _updateToTable(this.task_data, response.data)
                this.task_data = newData
                
                return { status: true, data: response.data, message: response.message }
            } catch (error) {
                return { status: false, message: 'Something went wrong.' }
            }
        },
        async delete(endpoint: string, payload?: any) {
            try {
                const response: any = await $fetch(`${this.base_url}/${endpoint}`, {
                    method: 'PUT'
                })

                _removeToTable(this.task_data, payload.id)
                return { status: true, message: response.message }
            } catch (error) {
                return { status: false, message: 'Something went wrong.' }
            }
        },
        async list(endpoint: string, payload: object) {
            const response: any = await $fetch(`${this.base_url}/${endpoint}`, {
                method: `POST`,
                body: payload
            })

            if (response) {
                this.task_data = response.data.records
                this.pagination.isLoading = false
                this.pagination.total = response.data.total
                return response.data
            }
            return false
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
                btnStatus: "",
            },
            deleteTask: {
                id: 0,
                task_name: ''
            },
            updateTask: {} as UpdateTask,
            event: { 
                trigger: false, action: ''
            }
        }
    },
    actions: {
        triggerEvent(event: any) {
            this.event.trigger = !this.event.trigger
            this.event.action = event.action
        },
        showToaster(event: any) {
            this.toastState.type = event.type
            this.toastState.message = event.message
        
            setTimeout(() => {
                this.toastState.type = ''
                this.toastState.message = ''
            }, 2000);
        },
        toggleModal(event: string, body?: object) {
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

                    const data = body as any
                    this.deleteTask = {...data}
                break;
                case 'update':
                    this.modalState.state = !this.modalState.state
                    this.modalState.action = "update";
                    this.modalState.title = "Edit Task";
                    this.modalState.btnOkName = "Save";
                    this.modalState.btnStatus = "success";
                    const selected = body as any
                    this.updateTask = {...selected}
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

// PRIVATE FUNCTIONS
const _removeToTable = (table_data: any, id: number) => {
    const index: number = table_data.findIndex((item: any) => item.id === id)

    if (index !== -1) table_data.splice(index, 1)

    return table_data
}

const _updateToTable = (table_data: any, data: any) => {
    console.log('resp data', data)
    console.log('payload.id', data.id)
    const index: number = table_data.findIndex((item: any) => item.id === data.id)

    if (index !== -1) {
        const updatedData = {...table_data[0], ...data}
        table_data[index] = updatedData
        return table_data
    }

    return table_data
}

const _addToTable = (table_data: any): Boolean => {
    const store = useTodoStore()
    
    if (table_data.length < store.pagination.pageSize) return true
    return false
}