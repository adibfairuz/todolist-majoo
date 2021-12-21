import * as actions from './constants';

const initialState = {
    items: {
        data: [],
        loading: false,
        error: false
    },
    item: {
        data: {},
        error: false
    },
}

export default function crudReducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case actions.GET_ALL_ITEMS_WITH_API:
            return {
                ...state,
                items: {
                    data: [],
                    loading: true,
                    error: false
                }
            }
        case actions.GET_ALL_ITEMS_WITH_API_SUCCESS:
            return {
                ...state,
                items: {
                    data: payload.items,
                    loading: false,
                    error: false
                }
            }
        
        case actions.GET_ALL_ITEMS_WITH_API_ERROR:
            return {
                ...state,
                items: {
                    data: payload.items,
                    loading: false,
                    error: true
                }
            }

        case actions.GET_ALL_ITEMS:
            return {
                ...state,
            }
        case actions.GET_ALL_ITEMS_SUCCESS:
            return {
                ...state,
                items: {
                    data: payload.items
                }
            }

        case actions.GET_ITEM:
            return {
                ...state,
            }
        case actions.GET_ITEM_SUCCESS:
            return {
                ...state,
                item: {
                    data: payload.item,
                    loading: false,
                    error: false
                }
            }

        case actions.ADD_ITEM:
            return {
                ...state,
            }
        case actions.ADD_ITEM_SUCCESS:
            return {
                ...state,
                items: {
                    data: payload.items,
                    loading: false,
                    error: false
                }
            }

        case actions.UPDATE_ITEM:
            return {
                ...state,
            }
        case actions.UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                items: {
                    data: payload.items,
                    loading: false,
                    error: false
                }
            }

        case actions.DELETE_ITEM:
            return {
                ...state,
            }
        case actions.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                items: {
                    data: payload.items,
                    loading: false,
                    error: false
                }
            }
        case actions.DELETE_ITEM_ERROR:
            return {
                ...state,
                items: {
                    data: payload.items,
                    loading: false,
                    error: true
                }
            }
            

        default:
            return state;
    }
}