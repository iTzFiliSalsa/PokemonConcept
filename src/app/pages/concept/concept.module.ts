import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptRoutingModule } from './concept-routing.module';
import { ConceptComponent } from './concept.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestingDirective } from 'src/app/libs/infraestructure/directives/testing.directive';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ConceptComponent,
    TestingDirective
  ],
  imports: [
    CommonModule,
    ConceptRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ConceptModule { }
