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
                                v-model="formData.start_date"
                                type="datetime-local"
                                :class="[
                                    'datetime border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500',
                                    { 'invalid': !formValidation.start_date.isValid && formValidation.start_date.isTouched }
                                ]">
                            </input>
                        </div>
                        <Icon color="#1976D2" name="calendar"></Icon>
                    </div>
                    <span 
                        class="form-field_message"
                        v-show="!formValidation.start_date.isValid && formValidation.start_date.isTouched">
                        {{  formValidation.start_date.errMsg  }}
                    </span>
                </div>
                <div class="form-field">
                    <label class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                    <div class="form-field-date">
                        <div class="datetime-container">
                            <input
                                @blur="validate"
                                v-model="formData.end_date" 
                                type="datetime-local"
                                :class="[
                                    'datetime border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500',
                                    { 'invalid': !formValidation.end_date.isValid && formValidation.end_date.isTouched }
                                ]">
                            </input>
                        </div>
                        <Icon color="#1976D2" name="calendar"></Icon>
                    </div>
                    <span 
                        class="form-field_message"
                        v-show="!formValidation.end_date.isValid && formValidation.end_date.isTouched">
                        {{  formValidation.end_date.errMsg  }}
                    </span>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
    import { useEventEmitter } from '~/store/base';

    const store = useEventEmitter()
    const formData = reactive({
        task_name: '',
        description: '',
        start_date: '',
        end_date: ''
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
        start_date: {
            isValid: false,
            isTouched: false,
            errMsg: ''
        },
        end_date: {
            isValid: false,
            isTouched: false,
            errMsg: ''
        },
    })

    watch(store.data, (value) => {
        if (value.action === 'create') {
            submitForm()  
        }
    })

    const submitForm = () => {
        const isValid = validate()
        if (isValid) {
            store.spinnerState.isLoading = true
            setTimeout(() => {
                store.spinnerState.isLoading = false
                store.toggleModal('close')
                store.showToaster({ type: 'success', message: 'Successfully Created!' })
            }, 3000);
        } else {
            store.spinnerState.isLoading = false
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

        if (!formData.start_date) {
            formValidation.value.start_date['isValid'] = false
            formValidation.value.start_date['isTouched'] = true
            formValidation.value.start_date['errMsg'] = 'Start date is required!'
            store.formState = { isValid: false, action: 'create' }
            return false
        } else {
            formValidation.value.start_date['isValid'] = true
        }

        if (!formData.end_date) {
            formValidation.value.end_date['isValid'] = false
            formValidation.value.end_date['isTouched'] = true
            formValidation.value.end_date['errMsg'] = 'End date is required!'
            store.formState = { isValid: false, action: 'create' }
            return false
        } else {
            formValidation.value.end_date['isValid'] = true
        }

        store.formState = { isValid: true, action: 'create' }
        return true
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