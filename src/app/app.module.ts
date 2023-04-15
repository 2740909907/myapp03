import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MainComponent } from './main/main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotelComponent } from './hotel/hotel.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserTextComponent } from './user-text/user-text.component';
import { CommonModule, DatePipe } from '@angular/common';
import { UserProductComponent } from './user-product/user-product.component';
import { UserHotelComponent } from './user-hotel/user-hotel.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AuthGuard } from './auth.guard';
import { Main2Component } from './main2/main2.component';
import { HotelTextComponent } from './hotel-text/hotel-text.component';
import { PersonTextComponent } from './person-text/person-text.component';
import { TextChangeComponent } from './text-change/text-change.component';
import { Index2Component } from './index2/index2.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { AddproductComponent } from './addproduct/addproduct.component';
import { DeleteproductComponent } from './deleteproduct/deleteproduct.component';

const routes: Routes = [
  // { path: '', redirectTo: 'index',pathMatch:'full' },
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'index2', component: Index2Component, canActivate: [AdminAuthGuard] },
  { path: 'product-list', component: ProductListComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-text', component: UserTextComponent, canActivate: [AuthGuard] },
  {
    path: 'user-product',
    component: UserProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-hotel',
    component: UserHotelComponent,
    canActivate: [AuthGuard],
  },
  //{path: 'main',component: MainComponent},
  {
    path: 'product-detail/:pid',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'hotel/:pid', component: HotelComponent, canActivate: [AuthGuard] },
  { path: 'hotel-list', component: HotelListComponent },
  { path: 'search-page', component: SearchPageComponent },
  {
    path: 'hotel-text',
    component: HotelTextComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'person-text',
    component: PersonTextComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'addproduct',
    component: AddproductComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'text-change',
    component: TextChangeComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'deleteproduct',
    component: DeleteproductComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductListComponent,
    CartComponent,
    UserLoginComponent,
    MainComponent,
    ProductDetailComponent,
    NotFoundComponent,
    HotelComponent,
    HotelListComponent,
    CommentComponent,
    CommentListComponent,
    UserRegisterComponent,
    UserTextComponent,
    UserProductComponent,
    UserHotelComponent,
    SearchPageComponent,
    Main2Component,
    HotelTextComponent,
    PersonTextComponent,
    TextChangeComponent,
    Index2Component,
    AddproductComponent,
    DeleteproductComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    //AppRoutingModule
    RouterModule.forRoot(routes), //注册路由模块s
    FormsModule, //ngModule
    ReactiveFormsModule,
    HttpClientModule, //httpclient
    CommonModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    AuthGuard,
    AdminAuthGuard, // 注入 AdminAuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
