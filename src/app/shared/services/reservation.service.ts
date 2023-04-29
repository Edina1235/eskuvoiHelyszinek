import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Reservation} from "../models/Reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  collectionName='Reservations';

  constructor(private firestore: AngularFirestore) { }

  create(reservation: Reservation) {
    reservation.id = this.firestore.createId();
    return this.firestore.collection<Reservation>(this.collectionName).doc(reservation.id).set(reservation);
  }
  delete(id: string) {
    return this.firestore.collection<Reservation>(this.collectionName).doc(id).delete();
  }
  update(reservation: Reservation) {
    return this.firestore.collection<Reservation>(this.collectionName).doc(reservation.id).set(reservation);
  }
  getAll(email: string) {
    return this.firestore.collection<Reservation>(this.collectionName,
        ref => ref.where('rendelo','==',email)
                          .orderBy('datum','asc'))
                          .valueChanges();
  }
}
