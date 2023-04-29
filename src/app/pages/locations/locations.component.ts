import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ImageService} from "../../shared/services/image.service";
import {Location} from "../../shared/models/Location";
import {LocationService} from "../../shared/services/location.service";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit,OnDestroy{
  hatter:string='';
  helyek?: Array<Location>;
  seged?: Location;
  sub?:Subscription;
  constructor(private router:Router, private image: ImageService, private location: LocationService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.location.getAll().subscribe(data => {
      this.helyek=data;
      for(let i=0;i<this.helyek.length;i++) {
        this.image.loadImage(this.helyek[i].kep).subscribe(data => {
          if (this.helyek) {
            this.helyek[i].kep=data;
          }
        },error => {
          console.error(error);
        });
      }
    },error => {
      console.error(error);
    });
  }


  navigalas(hely: Location) {
    this.seged=hely;
    this.router.navigateByUrl('/locations/allocates/'+this.seged.id);
  }


  onActivate(event: any) {
    console.log(event);
  }

  listazas() {
    this.router.navigateByUrl('datas');
  }

  kijelentkezes() {
    this.auth.logout().then(_=> {
      console.log('siker');
      localStorage.removeItem('user');
    }).catch(error=>console.error(error));
    this.router.navigateByUrl('login');
  }

  getUrl():Object {
    this.sub = this.image.loadImage('images/back.jpg').subscribe(data => {
      this.hatter=data;
    });
    return {'background-image': 'url('+this.hatter as string+')'};
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
