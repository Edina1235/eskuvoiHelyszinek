import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage: AngularFireStorage) { }

  loadImage(url: string) {
    return this.storage.ref(url).getDownloadURL();
  }
}
