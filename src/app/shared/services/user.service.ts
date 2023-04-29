import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private firestore: AngularFirestore) { }

  create(user: User) {
    user.id=this.firestore.createId();
    return this.firestore.collection<User>(this.collectionName).doc(user.id).set(user);
  }
  update(user: User) {
    return this.firestore.collection<User>(this.collectionName).doc(user.id).update(user);
  }
  getByEmail(email: string) {
    return this.firestore.collection<User>(this.collectionName,
        ref => ref.where('email','==',email))
                          .valueChanges();
  }
  delete(id: string) {
    return this.firestore.collection<User>(this.collectionName).doc(id).delete();
  }
  getAll() {
    return this.firestore.collection<User>(this.collectionName,
        ref => ref.orderBy('username','asc'))
                          .valueChanges();
  }
}
