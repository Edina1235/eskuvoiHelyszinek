import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Location} from "../models/Location";


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  collectionName = 'Locations'

  constructor(private firestore: AngularFirestore) { }

  create(location: Location) {
    location.id = this.firestore.createId();
    return this.firestore.collection<Location>(this.collectionName).doc(location.id).set(location);
  }
  getById(id: string) {
    return this.firestore.collection<Location>(this.collectionName).doc(id).valueChanges();
  }
  update(location: Location) {
    return this.firestore.collection<Location>(this.collectionName).doc(location.id).set(location);
  }
  getAll() {
    return this.firestore.collection<Location>(this.collectionName,
        ref => ref.orderBy('nev','asc')
                          .orderBy('id','asc'))
                          .valueChanges();
  }
  delete(id: string) {
    return this.firestore.collection<Location>(this.collectionName).doc(id).delete();
  }

}
