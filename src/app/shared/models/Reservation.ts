import { Timestamp } from 'firebase/firestore';

export interface Reservation {
  id: string;
  rendelo: string;
  mikor: Timestamp;
  nev: string;
  kep: string;
  datum: Timestamp;
}
