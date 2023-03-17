import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptRoutingModule } from './concept-routing.module';
import { ConceptComponent } from './concept.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConceptComponent
  ],
  imports: [
    CommonModule,
    ConceptRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConceptModule { }
