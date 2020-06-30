import { createAction, props } from '@ngrx/store';
import { ItemsRequest, ItemsResponce } from '../services/mock-data.service';
import { ItemUI } from '../models/item.model';

// TO DO Actions



const API_GET_ITEMS = '[API_GET_ITEMS] GET items from an api';
const API_GET_ITEMS_SUCCESS = '[API_GET_ITEMS_SUCCESS] GET items from an api SUCCESS';

const SELECT_ADD_ITEM = '[SELECT_ADD_ITEM] Select item for further calculating';
const MULTIPLE_SELECT_ADD_ITEMS = '[MULTIPLE_SELECT_ADD_ITEMS] Select item for further calculating';
const SELECT_REMOVE_ITEM = '[SELECT_REMOVE_ITEM] Remove item from selected list';
const SELECT_CLEAR_SELECTED_LIST = '[SELECT_CLEAR_SELECTED_LIST] Clear selected list';


// API CALLS
export const _ApiGetItems = createAction(API_GET_ITEMS,  props<{ request: ItemsRequest }>());
export function ApiGetItems(): any { return _ApiGetItems; };

export const _ApiGetItemsSuccess = createAction(API_GET_ITEMS_SUCCESS, props<{ responce: ItemsResponce<any> }>());
export function ApiGetItemsSuccess(): any { return _ApiGetItemsSuccess };
//END API CALLS


export const _SelectAddItem = createAction(SELECT_ADD_ITEM,  props<{ item: ItemUI }>());
export function SelectAddItem(): any { return _SelectAddItem; };

export const _MultipleSelectAddItems = createAction(MULTIPLE_SELECT_ADD_ITEMS);
export function MultipleSelectAddItems(): any { return _MultipleSelectAddItems; };

export const _SelectRemoveItem = createAction(SELECT_REMOVE_ITEM,  props<{ item: ItemUI }>()); // need Id. GEt Data from DataBase
export function SelectRemoveItem(): any { return _SelectRemoveItem; };

export const _SelectClearSelected = createAction(SELECT_CLEAR_SELECTED_LIST); // need Id. GEt Data from DataBase
export function SelectClearSelected(): any { return _SelectClearSelected; };
