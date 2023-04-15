import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  public apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}
  cartItems: any[] = [];
  // 调用获取商品列表的接口
  // getProducts() {
  //   return this.http.get(this.apiUrl + 'api/product');
  // }
  public productApi = this.apiUrl + 'api/product';

  // getCarousel() {
  //   return this.http.get(this.apiUrl + 'api/carousel');
  // }
  public carouselApi = this.apiUrl + 'api/carousel';

  // 调用获取商品详情的接口
  getProductDetails(productId: number) {
    return this.http.get(this.apiUrl + 'api/product-details/' + productId);
  }
  getHotel1(productId: number) {
    return this.http.get(this.apiUrl + 'api/' + productId + '/hotels');
  }
  getHotel2(hotelId: number) {
    return this.http.get(this.apiUrl + 'api/hotels/' + hotelId);
  }
  postCart(product_id: number, quantity: number) {
    const data = { product_id, quantity };
    const url = this.apiUrl + 'api/cart/postcart';
    return this.http.post(url, data);
  }
  addItemToCart(product: any, quantity: number) {
    const existingItem = this.cartItems.find(
      (item) => item.product_id === product.product_id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      this.putCart(existingItem.product_id, existingItem.quantity);
    } else {
      const cartItem = {
        product_id: product.product_id,
        title: product.title,
        price: product.price,
        image1: product.image1,
        quantity,
      };
      this.cartItems.push(cartItem);
      this.postCart(product.product_id, quantity).subscribe((result) => {
        console.log('response:', result);
      });
    }
  }
  getCart() {
    return this.http.get(this.apiUrl + 'api/cart/getcart');
  }
  putCart(itemId: number, quantity: number) {
    const data = { quantity };
    const url = this.apiUrl + 'api/cart/' + itemId + '/putcart';
    return this.http.put(url, data);
  }
  deleteCart(itemId: number) {
    return this.http.delete(this.apiUrl + 'api/cart/' + itemId + '/deletecart');
  }
  postLogin(username: string, password: string) {
    const data = { username, password };
    const url = this.apiUrl + 'api/user/login';
    return this.http.post(url, data);
  }
  postRegister(username: any, password: any, email: any) {
    const data = { username, password, email };
    const url = this.apiUrl + 'api/user/register';
    return this.http.post(url, data);
  }
  getCartItem(user_id: number) {
    return this.http.get(this.apiUrl + 'api/carts/cart-items/' + user_id);
  }
  postCartItem(user_id: number, product_id: number, quantity: number) {
    const data = { user_id, product_id, quantity };
    const url = this.apiUrl + 'api/carts/add-to-cart';
    return this.http.post(url, data);
  }
  putCartItem(cart_id: number, quantity: number) {
    const data = { quantity };
    const url = this.apiUrl + 'api/carts/update-quantity/' + cart_id;
    return this.http.put(url, data);
  }
  deleteCartItem(cart_id: number) {
    return this.http.delete(this.apiUrl + 'api/carts/remove-item/' + cart_id);
  }
  gettext() {
    return this.http.get(this.apiUrl + 'api/text/products');
  }
  posttext(user_id: number, title: string, price: number, quantity: number) {
    const data = { user_id, title, price, quantity };
    const url = this.apiUrl + 'api/text/products';
    return this.http.post(url, data);
  }
  getusertext(user_id: number) {
    return this.http.get(this.apiUrl + 'api/text/products/' + user_id);
  }
  gethotel() {
    return this.http.get(this.apiUrl + 'api/hotel/userhotels');
  }
  posthotel(
    user_id: number,
    title: string,
    roomType: string,
    totalPrice: number,
    totalNights: number
  ) {
    const data = { user_id, title, roomType, totalPrice, totalNights };
    const url = this.apiUrl + 'api/hotel/userhotels';
    return this.http.post(url, data);
  }
  getuserhotel(user_id: number) {
    return this.http.get(this.apiUrl + 'api/hotel/userhotels/' + user_id);
  }
  getcomment(product_id: number) {
    return this.http.get(
      this.apiUrl + 'api/usercomment/comments/' + product_id
    );
  }
  postcomment(product_id: number, user_id: number, comment_text: string) {
    const data = { product_id, user_id, comment_text };
    const url = this.apiUrl + 'api/usercomment/comments';
    return this.http.post(url, data);
  }
  getsearch(keyword1: string) {
    const url = this.apiUrl + 'api/findproduct/search';
    return this.http.get(url, { params: { keyword: keyword1 } });
  }
  getproducttext() {
    return this.http.get(this.apiUrl + 'api/product-details/');
  }
  gethoteltext() {
    return this.http.get(this.apiUrl + 'api/texthotels');
  }
  postproductdetail(
    product_id: number,
    image1: any,
    image2: any,
    image3: any,
    title: any,
    title1: any,
    title2: any,
    price: any,
    content1: any,
    content2: any,
    phone: any,
    hotel1name: any,
    hotel1a: any,
    hotel1price: any,
    hotel2name: any,
    hotel2a: any,
    hotel2price: any,
    hotel3name: any,
    hotel3a: any,
    hotel3price: any,
    picture1: any,
    picture2: any,
    picture3: any
  ) {
    const data = {
      product_id,
      image1,
      image2,
      image3,
      title,
      title1,
      title2,
      price,
      content1,
      content2,
      phone,
      hotel1name,
      hotel1a,
      hotel1price,
      hotel2name,
      hotel2a,
      hotel2price,
      hotel3name,
      hotel3a,
      hotel3price,
      picture1,
      picture2,
      picture3,
    };
    const url = this.apiUrl + 'api/product-details/products';
    return this.http.post(url, data);
  }
  postadminproduct(name1: any, name2: any, price: any, image_url: any) {
    const data = { name1, name2, price, image_url };
    const url = this.apiUrl + 'api/product/products';
    return this.http.post(url, data);
  }
  postadminhotel(
    hotel_name: any,
    address: any,
    phone_number: any,
    image_url: any,
    price1: any,
    price2: any,
    price3: any
  ) {
    const data = {
      hotel_name,
      address,
      phone_number,
      image_url,
      price1,
      price2,
      price3,
    };
    const url = this.apiUrl + 'api/hotel';
    return this.http.post(url, data);
  }
  postproducthotel(product_id: number, hotel_id: number) {
    const data = { product_id, hotel_id };
    const url = this.apiUrl + 'api/productdetail-hotel/producthotel';
    return this.http.post(url, data);
  }
  deleteproductdetail(product_id: number) {
    return this.http.delete(this.apiUrl + 'api/product-details/' + product_id);
  }
  deleteproduct(product_id: number) {
    return this.http.delete(this.apiUrl + 'api/product/' + product_id);
  }
}
