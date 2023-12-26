import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appImagenError]'
})
export class ImagenErrorDirective{

  @Input() appImagenError!: string;

  constructor(
    private el: ElementRef
  ) { }

  @HostListener("error")
  onImageError(){
    const element = this.el.nativeElement;
    element.src = this.appImagenError || "https://cdn-icons-png.flaticon.com/512/4923/4923785.png";
  }
}
