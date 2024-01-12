import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { NgForm, NgModel} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';

//Importamos los Servicios para trabajar con ellos en esta Clase
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]

})


export class LoginComponent implements  OnInit
{//Inicio Clase LoginComponent

  public title: string;
  public user: Users;
  public status: string = '';
  
  
  constructor(private _UsersService: UsersService, private _route:ActivatedRoute, private router:Router)
  {
    this.title = "Autenticación User";
    this.status = "";
    this.user = new Users('', '', '75070144', false);
  }

  
  //******METODOS DE LA CLASE*****/
  ngOnInit()
  {
  
  }

  
  //Metodo para Autenticar el Usuario Actual
  getLoginUser(email:String, psw:String)  
  {
    this._UsersService.getLoginUser(email, psw).subscribe
    (
      response => 
      {
        
        if(response)
        {
          console.log('SI ENTRO AL RESPONSE', response.status);
          this.status = 'success';
          this.router.navigate(['create-project']);
        }
        //console.log('Este es el supuesto response puess:', response);
        //this.status = 'success';

      },
 
      error => 
      {
        console.log('Email de Usuario o Password Incorrectos !!!');
        this.status = 'failed';

        //console.log(<any>error);

      }

    );
    
   //console.log('SI ENTRO AL METODO getLoginUser DEL COMPONENTE FRONT');
  }

  

  onSubmit(userForm: NgForm)
  {
    //this._route.params.subscribe(params =>
      //{
        console.log('Este es UserForm:',userForm.form.value.email);

        let email = userForm.form.value.email;
        let psw = userForm.form.value.password;

        console.log(email);
        console.log(psw);

        this.getLoginUser(email, psw);
      //});
  }//Fin OnSubmit

}//Fin Clase LoginComponent