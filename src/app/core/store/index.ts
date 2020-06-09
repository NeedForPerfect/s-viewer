import {
	ApiGetItems,
	ApiGetItemsSuccess,
	SelectAddItem,
	SelectRemoveItem,
	SelectClearSelected
} from './actions';
import { ItemsReducer } from './reducer';
import { ItemsEffects } from './effects';

export const rootStore = {
	ApiGetItems,
	ApiGetItemsSuccess,
	SelectAddItem,
	SelectRemoveItem,
	SelectClearSelected,
	ItemsReducer,
	ItemsEffects
};