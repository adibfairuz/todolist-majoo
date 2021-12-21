import moment from 'moment';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from './constants'
import { itemsSelector } from './selectors';
import { getAllItemsWithApiService } from './service';

export function* getAllItemsWithApi(action) {
    try {
        const data = yield call(getAllItemsWithApiService)
        yield put({
            type: actions.GET_ALL_ITEMS_WITH_API_SUCCESS,
            payload: {
                ...action.payload,
                items: data.data?.map?.(item => {
                    return{
                        ...item,
                        id: item.id.toString()
                    }
                })
            }
        })
    } catch (error) {
        yield put({
            type: actions.GET_ALL_ITEMS_WITH_API_ERROR,
            payload: {
                ...action.payload,
                items: error.data
            }
        })
    }
}

export function* getAllItems(action) {
    const items = [...yield select(itemsSelector)]
    yield put({
        type: actions.GET_ALL_ITEMS_SUCCESS,
        payload: {
            ...action.payload,
            items: items?.map?.(item => {
                return{
                    ...item,
                    id: item.id.toString()
                }
            })
        }
    })
}

export function* getItem(action) {
    const items = [...yield select(itemsSelector)]
    const item = items?.find(item => item.id === action.payload?.params?.id)
    yield put({
        type: actions.GET_ITEM_SUCCESS,
        payload: {
            ...action.payload,
            item
        }
    })
}

export function* addItem(action) {
    const items = [...yield select(itemsSelector)]
    const params = {
        ...action.payload?.params,
        id: Math.floor(Math.random() * 10000) + 1,
        status: 0,
        createdAt: moment().format("yyyy-M-D hh:m")
    }
    items.push(params)
    yield put({
        type: actions.ADD_ITEM_SUCCESS,
        payload: {
            ...action.payload,
            items
        }
    })
}

export function* updateItem(action) {
    const params = action.payload?.params
    const items = [...yield select(itemsSelector)]
    const item = items?.find(item => item?.id?.toString() === params?.id?.toString())
    const index = items.indexOf(item)
    items[index] = params
    yield put({
        type: actions.UPDATE_ITEM_SUCCESS,
        payload: {
            ...action.payload,
            items
        }
    })
}

export function* deleteItem(action) {
    const params = action.payload?.params
    const items = [...yield select(itemsSelector)]
    const item = items?.find(item => item.id === params?.id)
    const index = items.indexOf(item)
    items.splice(index, 1)
    yield put({
        type: actions.DELETE_ITEM_SUCCESS,
        payload: {
            ...action.payload,
            items
        }
    })
}

export default function* crudSaga() {
    yield takeEvery(actions.GET_ALL_ITEMS_WITH_API, getAllItemsWithApi)
    yield takeEvery(actions.GET_ALL_ITEMS, getAllItems)
    yield takeLatest(actions.GET_ITEM, getItem)
    yield takeEvery(actions.ADD_ITEM, addItem)
    yield takeEvery(actions.UPDATE_ITEM, updateItem)
    yield takeEvery(actions.DELETE_ITEM, deleteItem)
}
