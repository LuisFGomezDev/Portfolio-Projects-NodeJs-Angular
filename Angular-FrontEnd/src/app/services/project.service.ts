import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";  
import { Project } from "../models/project";
import { Global } from "./global";
import { Observable } from 'rxjs';



@Injectable()

export class ProjectService
{
    public url: string;

    constructor(
        private _http: HttpClient
    )
    {
        this.url = Global.url;
    }

    testService()
    {
        return "Probando el Servicio desde Angular";
    }

    
    //Creo un metodo para agregar un Proyecto a la API de Proyectos
    saveProject(project: Project): Observable<any>
    {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
            
        return this._http.post(this.url+ 'save-project', params, {headers: headers});
    }



    //Creo un metodo para consultar todos los proyectos a la API de Proyectos
    getProjects(): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Solicitamos con AJAX consumir una URL de nuestro Backend para listar los proyectos que tengamos
        return this._http.get(this.url+ 'projects',  {headers: headers});
    }


    //Creo un metodo para consultar un proyecto especifico a la API de Proyectos
    getProject(id: any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Solicitamos con AJAX consumir una URL de nuestro Backend para listar los proyectos que tengamos
        return this._http.get(this.url+ 'project/'+id,  {headers: headers});
    }


    //Creo un metodo para Borrar un proyecto especifico por medio de la API de Proyectos
    deleteProject(id: any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Solicitamos con AJAX consumir una URL de nuestro Backend para listar los proyectos que tengamos
        return this._http.delete(this.url+ 'project/'+id,  {headers: headers});
    }


    //Creo un método para Editar un proyecto especifico por medio de la API de Proyectos
    updateProject(project: Project, id:any): Observable<any>
    {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Solicitamos con AJAX consumir una URL de nuestro Backend para listar los proyectos que tengamos
        return this._http.put(this.url+ 'project/'+id, params, {headers: headers});
    }



}