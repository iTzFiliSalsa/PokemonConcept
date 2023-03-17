import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionsComponent } from './actions.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActionsComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ActionsModule { }
