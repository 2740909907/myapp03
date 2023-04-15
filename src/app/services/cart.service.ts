import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  constructor() { }
  getCartItems(): Product[] {
    return this.cartItemsSubject.value;
  }
  addToCart(product: Product) {
    const currentCartItems = this.cartItemsSubject.value;
    const existingCartItem = currentCartItems.find(item => item.id === product.id);
    if (existingCartItem) {
      const updatedCartItems = currentCartItems.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
      this.cartItemsSubject.next(updatedCartItems);
    } else {
      const newCartItem = {
        ...product,
        quantity: 1
      };
      const newCartItems = [...currentCartItems, newCartItem];
      this.cartItemsSubject.next(newCartItems);
    }
  }
}