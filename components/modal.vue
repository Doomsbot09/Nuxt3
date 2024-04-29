<template>
    <div 
        v-if=props.toggle 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div class="modal bg-white rounded-lg shadow-md">
            <div class="modal-header">
                <label>{{ props.title }}</label>
                <label 
                    @click="store.toggleModal('close')"
                    class="modal-header-close">
                    <Icon name="close"></Icon>
                </label>
            </div>
            <div class="modal-body">
                <div v-show="store.spinnerState.isLoading" class="modal-body_spinner">
                    <spinner size="35"></spinner>
                </div>
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button 
                    @click="store.toggleModal('close')"
                    class="modal-footer_btn btn-cancel">
                    <u>{{ props.btnCancelName }}</u>
                </button>
                <button
                    v-if="props.action === 'delete'"
                    @click="store.triggerEvent({ action: props.action })"
                    :disabled="store.spinnerState.isLoading"
                    class="modal-footer_btn btn-danger">
                    {{ props.btnOkName }}
                </button>
                <button
                    v-else
                    @click="store.triggerEvent({ action: props.action })"
                    :disabled="!store.formState.isValid && (props.action === 'create' || props.action === 'update')"
                    :class="['modal-footer_btn', 'btn-' + props.btnStatus]">
                    {{ props.btnOkName }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useEventEmitter } from '~/store/base';

    const store = useEventEmitter()
    const props = defineProps({
        toggle: {
            type: Boolean,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: 'Modal Title'
        },
        btnCancelName: {
            type: String,
            default: 'Cancel'
        },
        btnOkName: {
            type: String,
            default: 'Save'
        },
        btnStatus: {
            type: String,
            default: 'success'
        }
    })
</script>

<style lang="scss" scoped>
    .modal {
        height: auto;
        width: 40%;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        &-header {
            height: 10vh;
            background-color: #1D50A2;
            color: #FFFFFF;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 1rem;

            label {
                font-size: 17px;
                font-weight: 700;
            }

            &-close {
                cursor: pointer;
                color: #d5e5ff;
            }
        }

        &-body {
            height: auto;
            position: relative;

            &_spinner {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
            }
        }

        &-footer {
            height: 10vh;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 0.25rem;
            padding: 0 1rem;

            &_btn {
                padding: 0.25rem 1.5rem;
                border-radius: 1.5rem;
            }

            .btn-success {
                color: white;

                &:not(:disabled) {
                    background-color: #26A69A;
                }

                &:disabled {
                    cursor: not-allowed;
                    background-color: lighten(#26A69A, 20%);
                }
            }

            .btn-danger {
                color: white;

                &:not(:disabled) {
                    background-color: #C10015;
                }

                &:disabled {
                    cursor: not-allowed;
                    background-color: lighten(#C10015, 20%);
                }
            }

            .btn-cancel {
                color: #878787;
            }
        }
    }
</style>