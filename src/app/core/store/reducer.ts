import { Item, ItemUI } from '../models/item.model';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiGetItems, ApiGetItemsSuccess, SelectAddItem, SelectRemoveItem, SelectClearSelected } from './actions';
import { ItemsResponce, ItemsRequest } from '../services/mock-data.service';

export interface ItemsState {
  error?: any;
  items?: ItemUI[];
  selectedItems?: ItemUI[];
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
    // console.log(state, action);
    return { ...state, itemsQuery: { ...state.itemsQuery, ...action.request }, loading: true };
  }),
  on(ApiGetItemsSuccess(), (state, action: { responce: ItemsResponce<any> }) => 
  ({ 
    ...state,
    items: action.responce.items.map(item => ({...item, selected: false})),
    total: action.responce.total,
    loading: false 
  })),
  on(SelectAddItem(), (state, action) => {
    return { ...state, selectedItems: [...state.selectedItems, action.item ] };
  }),
  on(SelectRemoveItem(), (state, action: { item: ItemUI }) => {
    const withoutRemoved = state.selectedItems.filter((i) => {
      return i.number !== action.item.number;
    });
    return { ...state, selectedItems: [ ...withoutRemoved ] };
  }),
  on(SelectClearSelected(), (state, action: { item: ItemUI }) => {
    // const withoutRemoved = state.selectedItems.filter((i) => { i.number !== action.item.number });
    return { ...state };
  }),
);

export function ItemsReducer(state: ItemsState | undefined, action: Action) {
  return suppliersReducer(state, action);
}