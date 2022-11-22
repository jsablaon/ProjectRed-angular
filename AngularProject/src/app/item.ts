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

export interface CartItem {
    userId: string;
    storeId: string;
    itemId: string;
    itemQty: number;
    itemName: string;
    itemPrice: number;
    itemImage: string;
    itemVideo: string;
}

export interface Carts {
    cartId: string;
    userId: string;
    billingAddress: string;
    shippingAddress: string;
    paymentInfo: string;
    items: CartItem[];
}