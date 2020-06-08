export interface Item { // Basic Items types
	id?: number;
	number: string;
	commodity: string;
	origin: string;
	originShort: string;
	beneficialOwner: string;
	warrantStatus: string;
	warehousekeeper: string;
	warehouseShort: string;
	port: string;
	shed: string;
	rentPaidDate: string;
	rentExpiryDate: string;
}

export interface CoffeItem extends Item { // specific for COFFEE properties
	noOfBags: string;
	netWeightLBS: string;
}

export interface CocoaItem extends Item { // specific for COFFEE properties
	noOfBags: string;
	netWeightKG: string;
}

export type ItemUI = (CoffeItem & CocoaItem);