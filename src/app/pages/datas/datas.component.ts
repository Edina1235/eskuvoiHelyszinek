import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {ReservationService} from "../../shared/services/reservation.service";
import {Reservation} from "../../shared/models/Reservation";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";
import {ImageService} from "../../shared/services/image.service";
import {AuthService} from "../../shared/services/auth.service";
import { getAuth, deleteUser, updateEmail } from "firebase/auth";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-datas',
  templateUrl: './datas.component.html',
  styleUrls: ['./datas.component.scss']
})
export class DatasComponent implements OnInit, OnDestroy{
  foglalasok?: Array<Reservation>;
  seged?: string;
  user: User = {
    id:'',
    email: '',
    username:'',
    telefon:''
  };
  hatter: string='';
  email = new FormControl('');
  felhasznalonev = new FormControl('');
  telefon = new FormControl('');
  jelszo = new FormControl('');
  jelszoUjra = new FormControl('');
  id: string ='';
  sub?:Subscription;
  sub0?:Subscription;
  felhasznalok?: Array<User>;

  constructor(private router:Router,
              private reservation: ReservationService,
              private uservice: UserService,
              private imageload:ImageService,
              private auth: AuthService) {}

  ngOnInit() {
    this.sub0 = this.uservice.getAll().subscribe(data => {
      this.felhasznalok=data;
      console.log(data[0]);
    },error => {
      console.error(error);
    });
    this.seged = JSON.parse(localStorage.getItem('user') as string);
    this.uservice.getByEmail(this.seged as string).subscribe( data => {
      this.user = data[0];
      this.id = data[0].id;
      this.email.setValue(this.user.email as string);
      this.felhasznalonev.setValue(this.user.username as string);
      this.telefon.setValue(this.user.telefon as string);

      this.reservation.getAll(this.user.email as string).subscribe(value => {
        this.foglalasok=value;
        console.log(value);
        for(let i=0;i<this.foglalasok.length;i++) {
          this.imageload.loadImage(this.foglalasok[i].kep).subscribe( data => {
            if (this.foglalasok) {
              this.foglalasok[i].kep = data;
            }
          },error => {
            console.error(error);
          });
        }

      },error => {
        console.error(error);
      });

    }, error => console.error(error));
  }

  helyszinek() {
    this.router.navigateByUrl('locations');
  }

  kijelentkezes() {
    this.auth.logout().then(_ => {
      console.log('siker');
      localStorage.removeItem('user');
    }).catch(error => {
      console.error(error);
    });
    this.router.navigateByUrl('login');
  }

  modosit() {
    if(this.email.value !== '' && this.email.value !== this.user.email) {
      if(this.foglalasok!==undefined) {
        for(let i=0;i<this.foglalasok.length;i++) {
          this.foglalasok[i].rendelo=this.email.value as string;
          this.reservation.update(this.foglalasok[i]).then(cred => {
            console.log(cred);
          }).catch(error => {
            console.log(error);
          });
        }
      }

      const user = getAuth().currentUser;
      if(user) {
        updateEmail(user, this.email.value as string).then( cred => {
          console.log(cred);
        }).catch(error => {
          console.log(error);
        });
      }

      this.user.email = this.email.value as string;
    }
    if(this.telefon.value !== '' && this.telefon.value !== this.user.telefon) {
      this.user.telefon = this.telefon.value as string;
    }
    if(this.felhasznalonev.value !== '' && this.felhasznalonev.value !== this.user.username) {
      this.user.username = this.felhasznalonev.value as string;
    }
    this.user.id=this.id as string;
    console.log(this.user);
    this.uservice.update(this.user).then(_ => {
      console.log('siker');
    }).catch(error=> {
      console.error(error);
    }).finally(()=>{});

  }

  torles(reservation: Reservation) {
      this.reservation.delete(reservation.id).then(_ => {
        console.log("siker");
      }).catch(error => {
        console.error(error);
      });
  }

  deleteUser() {
    this.uservice.delete(this.user.id).then(_ => {
      console.log('siker')
      localStorage.removeItem('user');
      let user = getAuth().currentUser;
      console.log(user);
      if (user) {
        deleteUser(user).then(_ => {
          console.log('siker');
        }).catch(error=> {
          console.error(error);
        });
      }
    }).catch(error => {
      console.log(error);
    });
    this.router.navigateByUrl('login');
  }
  getUrl():Object {
    this.sub = this.imageload.loadImage('images/back.jpg').subscribe(data => {
      this.hatter=data;
    });
    return {'background-image': 'url('+this.hatter as string+')'};
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.sub0?.unsubscribe();
  }

}
