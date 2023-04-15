// cart.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Product } from '../product';
import { CartService } from '../services/cart.service';
import { UrlService } from '../url.service';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  //totalAmount = 0;
  //selected=false
  @ViewChild('inputBox')
  inputBox: ElementRef | any;
  constructor(
    private cartService: CartService,
    private nav: NavController,
    public apiService: UrlService,
    public sharedService: SharedService,
    public alertController: AlertController
  ) {}
  ngOnInit() {
    this.sharedService.cartItems = []; // 初始化空数组
    this.getCartItems();
  }
  selectedItems: any[] = [];
  totalQuantity = 0;
  totalAmount = 0;
  getCartItems() {
    this.apiService
      .getCartItem(this.sharedService.user_id)
      .subscribe((data: any) => {
        this.sharedService.cartItems = data[0];
        console.log(this.sharedService.cartItems);
        //console.log(this.cartItems);
        //this.calculateTotal();
        this.calculateTotals();
      });
  }
  updateCartItemQuantity(item: any, event: any) {
    if (!event || !event.target) {
      return;
    }
    let newQuantity = parseInt(event.target.value);
    //this.validateInput(item, event);
    //icon.style.display = 'none';
    if (
      isNaN(newQuantity) ||
      newQuantity < 1 ||
      newQuantity.toString() !== event.target.value ||
      newQuantity < 0
    ) {
      return;
    }
    this.apiService.putCartItem(item.cart_id, newQuantity).subscribe(() => {
      item.quantity = newQuantity; // 只更新当前商品的数量
      //this.getCartItems();
      //console.log(res);
      this.calculateTotals();
      //this.getCartItems();
    });
  }
  deleteCartItem(item: any) {
    this.apiService.deleteCartItem(item.cart_id).subscribe(() => {
      const index = this.sharedService.cartItems.indexOf(item);
      if (index > -1) {
        this.sharedService.cartItems.splice(index, 1);
        //this.calculateTotal();
        //localStorage.removeItem(`item-${item.id}-quantity`);
        this.calculateTotals();
        //this.getCartItems();
      }
    });
  }

  goBack() {
    this.nav.back();
  }
  calculateTotals() {
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.selectedItems = [];

    for (const item of this.sharedService.cartItems) {
      if (item.selected) {
        this.totalQuantity += item.quantity;
        this.totalAmount += item.price * item.quantity;
        this.selectedItems.push(item);
      }
    }
    //console.log(this.totalQuantity);
    //console.log(this.totalAmount);
  }
  // toggleSelectCartItem(item: any) {
  //   item.selected = !item.selected;
  //   this.calculateTotals();
  // }
  pay() {
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '支付',
      message: '请确认是否要支付',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            console.log('再次弹出提示框！');
            this.paySelectedItems(); // 调用 showALert 函数，实现递归
          },
        },
      ],
    });
    await alert.present();
  }
  paySelectedItems() {
    const selectedItems = this.sharedService.cartItems.filter(
      (item) => item.selected
    );
    if (selectedItems.length === 0) {
      // no items selected
      return;
    }

    // make payment API call here
    // ...

    // remove selected items from cart
    for (const item of this.selectedItems) {
      this.apiService.deleteCartItem(item.cart_id).subscribe(() => {
        const index = this.sharedService.cartItems.indexOf(item);
        if (index > -1) {
          this.sharedService.cartItems.splice(index, 1);
          //this.getCartItems();
          this.calculateTotals();
        }
      });
    }

    // recalculate totals
    //this.calculateTotals();
    this.presentSuccessAlert();
    for (const item of this.selectedItems) {
      this.apiService
        .posttext(
          this.sharedService.user_id,
          item.title,
          item.price,
          item.quantity
        )
        .subscribe(() => {
          //console.log(res);
          this.apiService
            .getusertext(this.sharedService.user_id)
            .subscribe((data: any) => {
              this.sharedService.productItems = data;
              console.log(this.sharedService.productItems);
            });
        });
    }
  }
  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: '支付成功',
      message: '你已经成功支付了！',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('再次弹出提示框！');
            //this.posttext(items); // 调用 showALert 函数，实现递归
          },
        },
      ],
    });
    await alert.present();
  }
  // posttext(items: any) {

  // }
  // selectedItems: Product[] = [];
  // onCartItemSelectionChange() {
  //   this.selectedItems = this.cartItems.filter(item => item.selected);
  //   this.recalculateSelectedItems();
  // }
  // private recalculateSelectedItems() {
  //   this.selectedItems = this.cartItems.filter(item => item.selected);
  // }
}
