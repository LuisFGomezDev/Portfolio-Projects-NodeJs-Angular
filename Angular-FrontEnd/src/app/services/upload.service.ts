import { Injectable } from "@angular/core";
//import { HttpClient, HttpHeaders } from "@angular/common/http";  
//import { Project } from "../models/project";
import { Global } from "./global";
//import { Observable } from 'rxjs';



@Injectable()

export class UploadService
{
    public url: string;

    constructor()
    {
        this.url = Global.url;
    }

    
    //Creo un metodo para agregar varias imagenes al Proyecto en la BD y lo invoco cuando se de Clic en ENVIAR
    makeFileRequest(url:string, params: Array<string>, files: Array<File>, name: string)
    {
        //Retorna una promesa con una respuesta luego de juntar los archivos y enviarlos.
        return new Promise(function(resolve, reject)
        {
            //Creo un formulario para tratarlo tipo OBJETO para juntar ahi todas las imagenes subidas al sErvidor
            //y las envio por AJAX creando primero la peticion XMLHttpRequest()
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            //Leo la cantidad de archivos recibidos o para enviar con el proyecto y los cargo en la variable formData
            
            for(var i = 0; i < files.length; i++)
            {
                formData.append(name, files[i], files[i].name);
            }
            

            //Evaluo si el objeto AJAX ESTA LLENO O VACIO con la propiedad readyState
            xhr.onreadystatechange = function()
            {
                //Evaluo con un IF si arroja un resultado distinto de 0 y le coloco cualquier valor en este caso 4
                if(xhr.readyState == 4)
                {
                    //Evaluo si AJAX me devuelve status=200 OK o sea de que esta listo para realizar el envio del formData
                    //Y convierto la respuesta o responde a JSON para que se pueda leer
                    if(xhr.status == 200)
                    {
                        resolve(JSON.parse(xhr.response))
                    }
                    else
                    {
                        reject(xhr.response);
                    }
                }
            }

            //Estando ya listo el objeto AJAX abro el canal por POST y ENVIO el formulario con las imagenes formData al Backend
            xhr.open('POST', url, true);
            xhr.send(formData);

        });
    }
}