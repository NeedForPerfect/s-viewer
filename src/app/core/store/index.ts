import {
	ApiGetItems,
	ApiGetItemsSuccess,
} from './actions';
import { ItemsReducer } from './reducer';
import { ItemsEffects } from './effects';

export const rootStore = {
	ApiGetItems,
	ApiGetItemsSuccess,
	ItemsReducer,
	ItemsEffects
};