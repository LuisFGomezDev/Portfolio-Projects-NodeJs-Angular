import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";  
import { Users } from "../models/users";
import { Global } from "./global";
import { Observable } from 'rxjs';


@Injectable()

export class UsersService
{
    public url: string;

    constructor
    (
        private _http: HttpClient
    )
    {
        this.url = Global.url;
    }

    //Creo un metodo para consultar un Usuario especifico a la API de Proyectos - USERS
    getLoginUser(email: String, psw: String): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Solicitamos con AJAX consumir una URL de nuestro Backend para autenticar un Usuario en la BD
        return this._http.get(this.url+ 'users/'+email+'/'+psw,  {headers: headers});
    }

}