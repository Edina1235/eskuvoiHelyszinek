import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'dateMY'
})
export class DateMyPipe implements PipeTransform {

  transform(value: Timestamp, ...args: unknown[]): string {
    let datum = new Date(value.seconds* 1000 + value.nanoseconds/1000000);
    return datum.getFullYear()+'-'+(datum.getMonth()+1)+'-'+ datum.getDate();
  }

}
