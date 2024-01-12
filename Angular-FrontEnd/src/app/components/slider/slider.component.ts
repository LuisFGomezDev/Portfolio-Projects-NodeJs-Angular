import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit
{
  @Input() anchura: any;

  //Podemos utilizar este decorador para trasladar el valor de 'etiquetas' a captions
  //@Input('etiquetas') captions: any;
  @Input() etiquetas: any;


  //Para enviar datos desde este hijo al padre se usa @OutPut
  @Output() conseguirAutor = new EventEmitter();


  public autor: any;

  constructor()
  {
    this.autor =
    {
      nombre: "Luis Fernando Gomez M",
      website: "softwareengineer.it",
      youtube: "Luis Fdo G",
    };
  }

  
  //Metodo que permite lanzar los datos de Autor hacia el componente Contacto que hace las veces de hijo esta vez
  lanzar(event: any)
  {
    this.conseguirAutor.emit(this.autor);

  }


  ngOnInit()
  {
    $('#logo').on('click', function() 
    { 
      $("header").css("background", "green")
                 .css("height", "100px");
  
    });
  
/*
  $(function(){
    $('.galeria').bxSlider({
      mode: 'fade',
      captions: false,
      slideWidth: this.anchura
    });
  });
*/

  $('.galeria').bxSlider({
    mode: 'fade',
    captions: this.etiquetas,
    slideWidth: this.anchura
  });

  }//Fin onInit
}//Fin Class
