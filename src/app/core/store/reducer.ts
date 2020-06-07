import { Item } from '../models/item.model';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiGetItems, ApiGetItemsSuccess } from './actions';
import { ItemsResponce } from '../services/mock-data.service';

export interface ItemsState {
  error?: any;
  items?: Item[];
  selectedItems?: Item[];
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  loading?: boolean;
}

const initialState: ItemsState = {
  error: null,
  items: [],
  selectedItems: [],
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 48,
  loading: false
};

export const suppliersReducer = createReducer(
  initialState,
  on(ApiGetItems(), (state, action) => ({ ...state, loading: true })),
  on(ApiGetItemsSuccess(), (state, action: { responce: ItemsResponce<any> }) => 
  ({ 
    ...state,
    items: action.responce.items,
    totalItems: action.responce.totalCount,
    itemsPerPage: action.responce.count,
    loading: false 
  }))
);

export function ItemsReducer(state: ItemsState | undefined, action: Action) {
  return suppliersReducer(state, action);
}