import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-index2',
  templateUrl: './index2.component.html',
  styleUrls: ['./index2.component.scss'],
})
export class Index2Component implements OnInit {
  productItem: any[] = [];
  constructor(
    public sharedservice: SharedService,
    private router: Router,
    public apiService: UrlService
  ) {}

  ngOnInit() {
    this.getproduct();
  }
  dologout() {
    this.sharedservice.isAdminin = false;
    this.router.navigate(['/user-login']); // navigate to user login page
  }
  getproduct() {
    this.apiService.getproducttext().subscribe((res: any) => {
      this.sharedservice.productdetailItems = res;
      console.log(this.sharedservice.productdetailItems);
    });
  }
}
