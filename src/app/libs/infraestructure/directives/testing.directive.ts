import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTesting]'
})
export class TestingDirective implements OnInit{

  @Input() appTesting!: string;

  private color: string;

  constructor(
    private elementRef: ElementRef
  ) {
    this.color = 'red';
  }
  
  public ngOnInit(): void {
    this.color = this.appTesting || 'red';
    this.elementRef.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener("mouseenter")
  detectHover(){
    this.elementRef.nativeElement.style.backgroundColor = "black";
  }

  @HostListener("mouseleave")
  detectLeave(){
    this.elementRef.nativeElement.style.backgroundColor = this.color;
  }

}
