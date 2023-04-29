import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ImageService} from "../../shared/services/image.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  email = new FormControl('');
  jelszo = new FormControl('');
  hatter:string = '';
  sub?:Subscription;
  hiba: string = '';
  constructor(private router:Router, private auth:AuthService, private image:ImageService) {
  }
  ngOnInit() {
    console.log(JSON.parse('user') as string);
  }

  login() {
      this.auth.login(this.email.value as string,this.jelszo.value as string).then( cred => {
        console.log(cred);
        console.log(cred.user?.email);
        localStorage.setItem('user', JSON.stringify(cred.user?.email));
        this.router.navigateByUrl('locations');
      }).catch(error => {
        this.hiba='Hiba a bejelentkezés során (Hibás email vagy jelszó).';
        console.log(error);
      });
  }

  getUrl():Object {
    this.sub=this.image.loadImage('images/background-login.jpg').subscribe(data => {
      this.hatter=data;
    });
    return {'background-image': 'url('+this.hatter as string+')'};
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
