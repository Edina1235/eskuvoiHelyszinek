import {Component} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {ImageService} from "./shared/services/image.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'eskuvoiHelyszinek';
  actual:any='';
  data1:string='Bejelentkezés';
  data2:string='Regisztráció';


  constructor() {
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  close(event: boolean, sidenav: MatSidenav) {
    sidenav.close();
  }

  whichPage(event: any) {
    this.actual=event.router.url;
  }
}
