import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { NgForm, NgModel} from '@angular/forms';
import { Global } from 'src/app/services/global';

//Importamos los Servicios para trabajar con ellos en esta Clase
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]

})

export class CreateComponent implements  OnInit
{
  public title: string;
  public project: Project;
  
  public filesToUpload: Array<File>;
  public imageChangedEvent: any = 0;

  public save_project: any = '';
  public status: string = '';


  constructor(
    //Declaro las variables o propiedades para cargar los servicios y hacer uso de ellos  
    private _projectService: ProjectService,
    private _uploadtService: UploadService

    )
    
  {
    this.title = "Crear Nuevo Proyecto";
    this.project = new Project('', '', '', '', 2023, 'image');
    this.filesToUpload = [];

  }

  
  ngOnInit()
  {
    
  }

//*********************************************************************************************
//Con este evento capturo el momento cuando se van a enviar varias imagenes para el proyecto
  fileChangeEvent(fileInput: any): void
  {
    //Hacemos un Casting para forzar a que el archivo capturado sea de tipo FILE en un ARRAY
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  
/*
  //Este Metodo - Convierte el File recibido a base 64
  imageCropped(event: ImageCroppedEvent) 
  {
      //Convierta la imagen a base64 y Asignela o carguela al ARRAY de imagenes
      this.croppedImage = event.base64;

      //En esta linea convierto la imagen a base64 - FILE
      var fileX = this.dataURLtoFile(this.croppedImage, 'image.png');

      //Con esta linea convertia a tipo file
      this.filesToUpload = fileX;
      //console.log(this.filesToUpload[0]);
  }



  dataURLtoFile(dataurl: any, filename: any) 
  {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
*/
  //***********************************************************************


  onSubmit(projectForm: NgForm)
  {
    //console.log(this.project);
    //console.log(this.project.name);

    //**ME ENVIA LOS DATOS POR HTTP A TRAVES DE ESTE SERVICIO**
    //Primero guardo los datos Aquí:
    
    this._projectService.saveProject(this.project).subscribe(
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