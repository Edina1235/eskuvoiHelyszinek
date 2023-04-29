import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {ReservationService} from "../../../shared/services/reservation.service";
import {Reservation} from "../../../shared/models/Reservation";
import {Location} from "../../../shared/models/Location";
import {LocationService} from "../../../shared/services/location.service";
import {ImageService} from "../../../shared/services/image.service";
import { Timestamp } from 'firebase/firestore';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-allocates',
  templateUrl: './allocates.component.html',
  styleUrls: ['./allocates.component.scss']
})
export class AllocatesComponent implements OnInit,OnDestroy{
    foglalas?: Reservation;
    hatter: any;
    ez:any;
    helyek?: Array<Location>;
    hely:Location = {id:'',
      nev: '',
      kep: '',
      cim: '',
      feroHely: '',
      telefon: '',
      email: '',
      ar: ''};
    datum = new FormControl('');
    dat?: number;
    sub?:Subscription;
    sub0?:Subscription;

    constructor(private actRoute: ActivatedRoute,
                private router:Router,
                private reservation: ReservationService,
                private location: LocationService,
                private image: ImageService) {
    }


    ngOnInit() {
      this.location.getAll().subscribe(data => {
        this.helyek=data;
        this.hely=this.helyek[0];
      },error => {
        console.error(error);
      });
      this.sub=this.actRoute.params.subscribe((param: any) => {
        this.ez = param.ez;
        console.log(this.ez);
      });
      this.location.getById(this.ez).subscribe(data => {
        this.hely=data as Location;
        this.image.loadImage(this.hely.kep).subscribe(data => {
          this.hely.kep=data;
        },error => {
          console.error(error);
        });
      }, error => {
        console.error(error);
      });
    }


  vissza() {
    this.router.navigateByUrl('locations');
  }

  foglal() {
      this.foglalas= {
        id:'',
        rendelo: JSON.parse(localStorage.getItem('user') as string),
        mikor: new Date() as unknown as Timestamp,
        nev: this.hely?.nev!=null ? this.hely?.nev : '',
        kep: this.hely?.kep!=null ? this.hely?.kep : '',
        datum: new Date(this.datum.value as string) as unknown as Timestamp
      }
      console.log(this.foglalas?.datum+' '+ this.foglalas?.mikor);
      this.reservation.create(this.foglalas).then( _ => {
        console.log("siker");
      }).catch(error => {console.error(error);});
  }
  getUrl():Object {
    this.sub0=this.image.loadImage('images/back.jpg').subscribe(data => {
      this.hatter=data;
    });
    return {'background-image': 'url('+this.hatter as string+')'};
  }

  ngOnDestroy() {
      this.sub?.unsubscribe();
      this.sub0?.unsubscribe();
  }

}
