export interface shoppingCartItem {
    name: string;
    count: number;
    price: number;
} 

export interface shoppingCartItems extends Array<shoppingCartItem>{}