import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ImagenErrorDirective } from './directives/imagen-error.directive';
import { ShowIfIsNeorisDirective } from './directives/show-if-is-neoris.directive';
import { FirstPipe } from './pipes/first.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    ImagenErrorDirective,
    ShowIfIsNeorisDirective,
    FirstPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ImagenErrorDirective,
    ShowIfIsNeorisDirective,
    FirstPipe
  ]
})
export class SharedModule { }
