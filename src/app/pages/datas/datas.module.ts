import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasRoutingModule } from './datas-routing.module';
import { DatasComponent } from './datas.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DateMyPipe} from "../../shared/pipes/date.pipe";


@NgModule({
    declarations: [
        DatasComponent,
        DateMyPipe
    ],
  imports: [
    CommonModule,
    DatasRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DatasModule { }
