import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-person-text',
  templateUrl: './person-text.component.html',
  styleUrls: ['./person-text.component.scss'],
})
export class PersonTextComponent implements OnInit {
  constructor(
    private router: Router,
    private sharedservice: SharedService,
    public apiService: UrlService
  ) {}
  personItem: any[] = [];
  hotelItem: any[] = [];
  ngOnInit() {
    this.getuserproduct();
    this.getuserhotel();
  }
  dologout() {
    this.sharedservice.isAdminin = false;
    this.router.navigate(['/user-login']); // navigate to user login page
  }
  getuserproduct() {
    this.apiService.gettext().subscribe((res: any) => {
      this.personItem = res;
      console.log(res);
    });
  }
  getuserhotel() {
    this.apiService.gethotel().subscribe((res: any) => {
      this.hotelItem = res;
      console.log(res);
    });
  }
}
