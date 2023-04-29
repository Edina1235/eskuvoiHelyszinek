import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllocatesRoutingModule } from './allocates-routing.module';
import { AllocatesComponent } from './allocates.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AllocatesComponent
  ],
    imports: [
        CommonModule,
        AllocatesRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatIconModule,
        MatNativeDateModule,
        MatCardModule
    ]
})
export class AllocatesModule { }
