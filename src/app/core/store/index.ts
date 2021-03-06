import {
	ApiGetItems,
	ApiGetItemsSuccess,
	SelectAddItem,
	MultipleSelectAddItems,
	SelectRemoveItem,
	SelectClearSelected
} from './actions';
import { ItemsReducer } from './reducer';
import { ItemsEffects } from './effects';
import { getSelected, getShownItems } from './selectors';

export const rootStore = {
	ApiGetItems,
	ApiGetItemsSuccess,
	SelectAddItem,
	MultipleSelectAddItems,
	SelectRemoveItem,
	SelectClearSelected,
	ItemsReducer,
	ItemsEffects,
	getSelected,
	getShownItems
};