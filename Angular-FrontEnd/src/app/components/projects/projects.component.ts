import { Component, OnInit } from '@angular/core';
//import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';

//Importamos los Servicios para trabajar con ellos en esta Clase
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})


export class ProjectsComponent implements  OnInit
{//Inicio de la Clase

  public projects: any;
  public url: string;


  //Declaro en el constructor las variables o propiedades para cargar los servicios y hacer uso de ellos
  constructor(private _projectService: ProjectService)
  {
    //En esta zona inicializamos las variables que cargaran cuando se crea la clase.
    this.projects = [];
    this.url = Global.url;
  }

  
  ngOnInit()
  {
    this.getProjects();
  }

  
  //Creamos el metodo para invocar al servicio y solicitar el listado de Projects
  getProjects()
  {
    
    this._projectService.getProjects().subscribe(
      response => 
      {
        if(response.projects)
        {
            this.projects = response.projects;
        }
      },
 
      error => 
      {
        console.log(<any>error);
      }

    );
    
   console.log('SI ENTRO AL METODO GETPROJECTS DEL COMPONENTE FRONT');
  }

}//FIN de la Clase