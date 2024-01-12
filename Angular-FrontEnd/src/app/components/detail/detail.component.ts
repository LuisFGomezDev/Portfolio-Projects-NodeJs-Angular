import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Importamos los Servicios para trabajar con ellos en esta Clase
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]

})


export class DetailComponent  implements  OnInit
{//iNICIO DE CLASE
  public url: string = '';
  public confirm: boolean;
  public project: any;
  

  constructor(private _projectService: ProjectService, private _router: Router, private _route:ActivatedRoute)
  {
    this.url = Global.url;
    this.confirm = false;
    //this.project = new Project('', '', '', '', 2023, 'image');
    //this.project = [];
    this.confirm = false;

  }



  //******METODOS DE LA CLASE*****/

  ngOnInit()
  {
    this._route.params.subscribe(params =>
    {
      let id = params['id'];
      this.getProject(id);
      
    });
    
  }

  //Metodo para obtener los detalles de un Proyecto especifico
  getProject(id:any)  
  {
    this._projectService.getProject(id).subscribe
    (
      response =>
      {
        this.project = response.project;
        //console.log(response.project);
        console.log('Este es el resultadoxsxsxs:',this.project);

      },
      error =>
      {
        console.log(<any>error);
      }
      
    );
  }


    //Metodo para asignar Confirm = true como parámetro
    setConfirm(confirm:boolean)  
    {
      this.confirm = confirm;
    }
  


    //Metodo para obtener los detalles de un Proyecto especifico
    deleteProject(id:any)  
    {
      this._projectService.deleteProject(id).subscribe
      (
        response =>
        {
          if(response.project)
          {
            this.project = response.project;

            //Hacemos una redirección
            this._router.navigate(['/projects']);
          }
        },
        error =>
        {
          console.log(<any>error);
        }
        
      );

   }




}//FIN DE CLASE