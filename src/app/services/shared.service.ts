import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isLoggedin = false;
  user_id: any;
  cartItems: any[] = [];
  productItems: any[] = [];
  hotelItems: any[] = [];
  isAdminin = false;
  product1Items: any[] = [];
  productdetailItems: any[] = [];
  hotel1Items: any[] = [];
}
