import { createSelector } from '@ngrx/store';
import { ItemsState } from './reducer';


const getItems = (state: ItemsState): any => {
  if (state) return state.items
  else return null;
};

const getSelectedItems = (state: ItemsState): any => {
  if (state) return state.selectedItems
  else return null;
};


const _getSelected = createSelector((state: { itemsState: ItemsState }) => state.itemsState, getSelectedItems);
function getSelected(): any { return _getSelected; }

const _getShownItems = createSelector((state: { itemsState: ItemsState }) => state.itemsState, getItems);
function getShownItems(): any { return _getShownItems; }


export { getSelected, getShownItems };