import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent  implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {}
  goBack() {
    this.nav.back()
  }
}
