import { createAction, props } from '@ngrx/store';
import { ItemsRequest, ItemsResponce } from '../services/mock-data.service';

// TO DO Actions


// GET items list
// Get Item detail

// Select Items - Action that get selected items list
// Add Selected item - Action that ad to selected one item
// Remove item - Action if user uncheck selected 
// Clear selected - Action  items 



const API_GET_ITEMS = '[API_GET_ITEMS] GET items from an api';
const API_GET_ITEMS_SUCCESS = '[API_GET_ITEMS_SUCCESS] GET items from an api SUCCESS';




export const _ApiGetItems = createAction(API_GET_ITEMS,  props<{ request: ItemsRequest }>());
export function ApiGetItems(): any { return _ApiGetItems; };

export const _ApiGetItemsSuccess = createAction(API_GET_ITEMS_SUCCESS, props<{ responce: ItemsResponce<any> }>());
export function ApiGetItemsSuccess(): any { return _ApiGetItemsSuccess };