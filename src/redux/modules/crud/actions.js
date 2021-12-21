import * as actions from './constants';

export function getAllItemsWithApi(payload) {
  return {
    type: actions.GET_ALL_ITEMS_WITH_API,
    payload
  };
}

export function getAllItems(payload) {
  return {
    type: actions.GET_ALL_ITEMS,
    payload
  };
}

export function getItem(payload) {
  return {
    type: actions.GET_ITEM,
    payload
  };
}

export function addItem(payload) {
  return {
    type: actions.ADD_ITEM,
    payload
  };
}

export function updateItem(payload) {
  return {
    type: actions.UPDATE_ITEM,
    payload
  };
}

export function deleteItem(payload) {
  return {
    type: actions.DELETE_ITEM,
    payload
  };
}