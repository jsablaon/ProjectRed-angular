export interface Item {
    id: number;
    name: string;
    price: number;
    qty: number;
}

export interface TargetItem {
    userId: string;
    storeId: string;
    itemId: string;
    itemName: string;
    itemPrice: string;
    itemImage: string;
    itemVideo: string;
}

export interface TargetStore {
    userId: string;
    storeId: string;
    locationName: string;
    distance: string;
    phoneNumber: string;
}