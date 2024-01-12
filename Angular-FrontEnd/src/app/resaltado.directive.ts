import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})

export class ResaltadoDirective {

  constructor(public el: ElementRef)
  {

  }

  ngOnInit()
  {
    let element = this.el.nativeElement;
    element.style.background = "yellow";
    element.style.padding = "20px";
    element.style.marginTop = "15px";
    element.style.color = "black";

    element.innerText = element.innerText.toUpperCase();
    element.innerText = element.innerText.replace("Pagina ","CASINO ");

  }

}
