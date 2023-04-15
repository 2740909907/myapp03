import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent  implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {}
  goBack() {
    this.nav.back()
  }
}
