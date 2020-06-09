import { Item, ItemUI } from '../models/item.model';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiGetItems, ApiGetItemsSuccess } from './actions';
import { ItemsResponce, ItemsRequest } from '../services/mock-data.service';

export interface ItemsState {
  error?: any;
  items?: ItemUI[];
  selectedItems?: Item[];
  loading?: boolean;
  total: number;
  itemsQuery: ItemsRequest;
}

const initialState: ItemsState = {
  error: null,
  items: [],
  selectedItems: [],
  loading: false,
  total: 0,
  itemsQuery: {
    itemsType: 'COFFEE',
    countries: [],
    page: 1,
    count: 25
  }
};

export const suppliersReducer = createReducer(
  initialState,
  on(ApiGetItems(), (state, action) => {
    return { ...state, itemsQuery: { ...state.itemsQuery, ...action.request }, loading: true };
  }),
  on(ApiGetItemsSuccess(), (state, action: { responce: ItemsResponce<any> }) => 
  ({ 
    ...state,
    items: action.responce.items,
    total: action.responce.total,
    loading: false 
  }))
);

export function ItemsReducer(state: ItemsState | undefined, action: Action) {
  return suppliersReducer(state, action);
}