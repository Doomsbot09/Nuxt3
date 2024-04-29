<template>
    <div class="container">
        <form @submit.prevent="submitForm" class="form">
            <div class="form-field">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Task Name
                </label>
                <input
                    @blur="validate"
                    v-model="formData.task_name"
                    require="true"
                    type="text"
                    placeholder="Example Task Name"
                    :class="[
                        'border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500',
                        { 'invalid': !formValidation.task_name.isValid && formValidation.task_name.isTouched }
                    ]">
                <span 
                    class="form-field_message"
                    v-show="!formValidation.task_name.isValid && formValidation.task_name.isTouched">
                    {{  formValidation.task_name.errMsg  }}
                </span>
            </div>

            <div class="form-field">
                <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    @blur="validate"
                    v-model="formData.description"
                    rows="4"
                    placeholder="Example Description..."
                    :class="[
                        'resize-none border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500',
                        { 'invalid': !formValidation.description.isValid && formValidation.description.isTouched }
                    ]">
                </textarea>
                <span 
                    class="form-field_message"
                    v-show="!formValidation.description.isValid && formValidation.description.isTouched">
                    {{  formValidation.description.errMsg  }}
                </span>
            </div>

            <div class="form-row-2">
                <div class="form-field">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                    <div class="form-field-date">
                        <div class="datetime-container">
                            <input
                                @blur="validate"
                                v-model="formData.starts_at"
                                type="datetime-local"
                                :class="[
                                    'datetime border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500',
                                    { 'invalid': !formValidation.starts_at.isValid && formValidation.starts_at.isTouched }
                                ]">
                            </input>
                        </div>
                        <Icon color="#1976D2" name="calendar"></Icon>
                    </div>
                    <span 
                        class="form-field_message"
                        v-show="!formValidation.starts_at.isValid && formValidation.starts_at.isTouched">
                        {{  formValidation.starts_at.errMsg  }}
                    </span>
                </div>
                <div class="form-field">
                    <label class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                    <div class="form-field-date">
                        <div class="datetime-container">
                            <input
                                @blur="validate"
                                v-model="formData.ends_at" 
                                type="datetime-local"
                                :class="[
                                    'datetime border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500',
                                    { 'invalid': !formValidation.ends_at.isValid && formValidation.ends_at.isTouched }
                                ]">
                            </input>
                        </div>
                        <Icon color="#1976D2" name="calendar"></Icon>
                    </div>
                    <span 
                        class="form-field_message"
                        v-show="!formValidation.ends_at.isValid && formValidation.ends_at.isTouched">
                        {{  formValidation.ends_at.errMsg  }}
                    </span>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
    import { useEventEmitter, useTodoStore } from '~/store/base';

    const store = useEventEmitter()
    const todoStore = useTodoStore()
    let formData = reactive({
        task_name: '',
        description: '',
        starts_at: '',
        ends_at: '',
    })
    const formValidation = ref({
        task_name: {
            isValid: false,
            isTouched: false,
            errMsg: '',
        },
        description: {
            isValid: false,
            isTouched: false,
            errMsg: ''
        },
        starts_at: {
            isValid: false,
            isTouched: false,
            errMsg: ''
        },
        ends_at: {
            isValid: false,
            isTouched: false,
            errMsg: ''
        },
    })

    onBeforeMount(() => {
        const action = store.modalState.action
        
        if (action === 'update') {
            populateForm()
            validate()
        }
    })

    watch(store.event, (value) => {
        if (value.action === 'create') {
            submitForm()  
        } else if (value.action === 'update') {
            updateForm()
        }
    })

    const submitForm = async () => {
        const isValid = validate()
        if (isValid) {
            store.spinnerState.isLoading = true
            store.formState.isValid = false

            const resp = await todoStore.create('task/create', formData)

            if (resp.status) {
                store.toggleModal('close')
                store.showToaster({ type: 'success', message: resp.message })
                store.spinnerState.isLoading = false
                todoStore.pagination.total = todoStore.pagination.total + 1
            } else {
                store.toggleModal('close')
                store.showToaster({ type: 'error', message: resp.message })
                store.spinnerState.isLoading = false
            }
        }
    }

    const updateForm = async () => {
        const isValid = validate()
        if (isValid) {
            store.spinnerState.isLoading = true
            store.formState.isValid = false

            const resp = await todoStore.update(`task/update/${store.updateTask.id}`, formData)

            if (resp.status) {
                store.toggleModal('close')
                store.showToaster({ type: 'success', message: resp.message })
                store.spinnerState.isLoading = false
            } else {
                store.toggleModal('close')
                store.showToaster({ type: 'error', message: resp.message })
                store.spinnerState.isLoading = false
            }
        }
    }

    const validate = (): Boolean => {
        if (!formData.task_name.trim()) {
            formValidation.value.task_name['isValid'] = false
            formValidation.value.task_name['isTouched'] = true
            formValidation.value.task_name['errMsg'] = 'Task name is required!'
            store.formState = { isValid: false, action: 'create' }
            return false
        } else {
            formValidation.value.task_name['isValid'] = true
        }

        if (!formData.description.trim()) {
            formValidation.value.description['isValid'] = false
            formValidation.value.description['isTouched'] = true
            formValidation.value.description['errMsg'] = 'Description is required!'
            store.formState = { isValid: false, action: 'create' }
            return false
        } else {
            formValidation.value.description['isValid'] = true
        }

        if (!formData.starts_at) {
            formValidation.value.starts_at['isValid'] = false
            formValidation.value.starts_at['isTouched'] = true
            formValidation.value.starts_at['errMsg'] = 'Start date is required!'
            store.formState = { isValid: false, action: 'create' }
            return false
        } else {
            formValidation.value.starts_at['isValid'] = true
        }

        if (!formData.ends_at) {
            formValidation.value.ends_at['isValid'] = false
            formValidation.value.ends_at['isTouched'] = true
            formValidation.value.ends_at['errMsg'] = 'End date is required!'
            store.formState = { isValid: false, action: 'create' }
            return false
        } else {
            formValidation.value.ends_at['isValid'] = true
        }

        store.formState = { isValid: true, action: 'create' }
        return true
    }

    const populateForm = () => {
        formData.task_name = store.updateTask.task_name
        formData.description = store.updateTask.description
        formData.starts_at = store.updateTask.starts_at
        formData.ends_at = store.updateTask.ends_at
    }
</script>

<style scoped lang="scss">
    .container {
        padding: 0.50rem 1rem;

        .cursor-pointer {
            cursor: pointer;
        }

        .invalid {
            border-color: #C10015;
        }

        .form {

            &-field {
                padding-bottom: 1.25rem;
                position: relative;

                &_message {
                    font-size: 13px;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    color: red;
                }
            }

            input {
                width: 100%;
            }


            &-row-2 {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .form-field {
                    width: 49%;

                    &-date {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .datetime-container {
                        box-sizing: border-box;
                        outline: 0;
                        position: relative;
                        width: 90%;
                    }

                    .datetime::-webkit-calendar-picker-indicator {
                        background: transparent;
                        bottom: 0;
                        cursor: pointer;
                        height: auto;
                        left: 0;
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: auto;
                    }
                }
            }
        }
    }
</style>