import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {ImageService} from "../../shared/services/image.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  user?: User;
  felhasznalonev = new FormControl('');
  email = new FormControl('');
  telefon = new FormControl('');
  jelszo = new FormControl('');
  jelszoUjra = new FormControl('');
  hatter: string = '';
  sub?:Subscription;
  reg:string='Várd meg még sikerül a regisztráció';
  fel:string='Várd meg még bekerülsz az adatbázisba';
  constructor(private auth:AuthService, private router: Router, private uservice: UserService, private image: ImageService) {
  }
  ngOnInit() {}

  register() {
    this.auth.register(this.email.value as string, this.jelszo.value as string).then(cred => {
        console.log(cred);
        this.reg='Sikeres regisztráció';
        this.user = {
          id:'',
          username: this.felhasznalonev.value as string,
          email: this.email.value as string,
          telefon: this.telefon.value as string
        };
        this.uservice.create(this.user).then( data => {
          console.log(data);
          console.log('siker');
          this.fel='Felhasználó elmentve az adatbázisban!';
        }).catch(error => {
          console.log(error);
          this.fel='Sikertelen a felhasználó elmentése az adatbázisban';
        });
    }).catch(error => {
        console.error(error);
        this.reg='Sikertelen regisztráció (hiányos adat vagy már regisztrálva van ez az email cím)';
        this.fel='';
    });
  }


  navigation() {
    this.router.navigate(['/login']);
  }

  getUrl():Object {
    this.sub = this.image.loadImage('images/background-register.jpg').subscribe(data => {
      this.hatter=data;
    });
    return {'background-image': 'url('+this.hatter as string+')'};
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
