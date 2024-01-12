import { Component, OnInit, Input, ViewChild} from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit
{
  public widthSlider: number = 0;
  public anchuraToSlider: any = 0;
  //public etiquetas: boolean = false;
  public autor: any;

  @ViewChild('someInput',{static: true}) Textos: any;

  //isShow: boolean = false;

  constructor() 
  {}

  ngOnInit()
  {
    console.log('estos son los textos:',this.Textos);
 
  }//Fin onInit


  cargarSlider()
  {
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider()
  {
    this.anchuraToSlider = false;
  }

  getAutor(event: any)
  {
    //this.anchuraToSlider = false;
    //console.log("Este es el EVENTOOX",event);
    
    this.autor = event;
    //console.log("Este es el nombre", +this.autor.nombre);
    //console.log("Este es el website", +this.autor.website);
    
    console.log("Este es el AUTOR ENTERO",this.autor);

  }

}//Fin Class
