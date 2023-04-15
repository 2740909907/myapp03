import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // 调用获取商品列表的接口
  getProducts() {
    return this.http.get(this.apiUrl + 'api/product');
  }

  getCarousel() {
    return this.http.get(this.apiUrl + 'api/carousel');
  }

  // 调用获取商品详情的接口
  getProductDetails(productId: number) {
    return this.http.get(this.apiUrl + productId + 'api/product-details');
  }
}
