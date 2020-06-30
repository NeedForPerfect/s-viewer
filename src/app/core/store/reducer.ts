import { ItemUI } from '../models/item.model';
import { createReducer, on, Action } from '@ngrx/store';
import { ApiGetItems, ApiGetItemsSuccess, SelectAddItem, SelectRemoveItem, SelectClearSelected, MultipleSelectAddItems } from './actions';
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
  on(ApiGetItemsSuccess(), (state, action: { responce: ItemsResponce<any> }) => {
    const items = markItemsAsSelected(action.responce.items, state.selectedItems);
    return {
      ...state,
      items: items,
      total: action.responce.total,
      loading: false 
    }
  }),
  on(SelectAddItem(), (state, action) => {
    const selectedItems = [...state.selectedItems, action.item ];
    const items = markItemsAsSelected(state.items, selectedItems);
    return { ...state, selectedItems, items };
  }),
  on(MultipleSelectAddItems(), (state, action) => {
    return { ...state, selectedItems: [...state.selectedItems, ...state.items ] };
  }),
  on(SelectRemoveItem(), (state, action: { item: ItemUI }) => {
    const withoutRemoved = state.selectedItems.filter((i) => {
      return i.number !== action.item.number;
    });
    const items = markItemsAsSelected(state.items, withoutRemoved);
    return { ...state, selectedItems: [ ...withoutRemoved ], items };
  }),
  on(SelectClearSelected(), (state, action: { item: ItemUI }) => {
    return { ...state };
  }),
);

export function ItemsReducer(state: ItemsState | undefined, action: Action) {
  return suppliersReducer(state, action);
}


function markItemsAsSelected(shownItems: ItemUI[], selectedItems: ItemUI[]) {
  return shownItems.map(i => {
    if (selectedItems.some(s => s.number === i.number)) {
      return {...i, selected: true};
    } else return { ...i, selected: false };
  });
}