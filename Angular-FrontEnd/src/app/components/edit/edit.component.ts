import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { NgForm, NgModel } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';

//Importamos los Servicios para trabajar con ellos en esta Clase
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  //templateUrl: '../create/create.component.html',

  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]

})

export class EditComponent implements  OnInit
{
  public title: string;
  public project: Project;
  
  public filesToUpload: Array<File>;
  public imageChangedEvent: any = 0;

  public save_project: any = '';
  public status: string = '';
  public id_proyecto: string = '';


  constructor(private _projectService: ProjectService, private _router: Router, private _route:ActivatedRoute, private _uploadtService: UploadService)
    
  {
    this.title = "Editar Proyecto";
    this.project = new Project('', '', '', '', 2023, 'image');
    this.filesToUpload = [];

  }

  
  //******METODOS DE LA CLASE*****/

  ngOnInit()
  {
    this._route.params.subscribe(params =>
    {
      let id = params['id'];
      this.id_proyecto = id;
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

  //*********************************************************************************************
  //Con este evento capturo el momento cuando se van a enviar varias imagenes para el proyecto
  fileChangeEvent(fileInput: any): void
  {
    //Hacemos un Casting para forzar a que el archivo capturado sea de tipo FILE en un ARRAY
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  //***********************************************************************

  onSubmit(projectForm: NgForm)
  {
    //console.log(this.project);
    //console.log(this.project.name);

    //**ME ENVIA LOS DATOS POR HTTP A TRAVES DE ESTE SERVICIO**
    //Primero MODIFICO los datos Aquí:

    this._projectService.updateProject(this.project, this.id_proyecto).subscribe(
      response =>
      {
        if(response.project)
        {
          this._uploadtService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image').then((result:any) => 
          {
            this.status = 'success';

            //Guardo el objeto devuelto en response en la variable save_project
            this.save_project = response.project;

            console.log(this.save_project);
            
            //Limpio los campos del formulario luego de enviarlo al Backend a guardar
            projectForm.resetForm();
          });

        }
        else
        {
          this.status = 'failed';
        }

        console.log(response);

      },
      error =>
      {
        console.log(<any>error);
      }
   
    );
    
  }

}