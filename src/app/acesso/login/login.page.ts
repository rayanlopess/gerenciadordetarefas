import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class LoginPage implements OnInit {
  public login:string = '';
  public senha:string = '';

  constructor(
    public autenticacao_service: AutenticacaoService,
    public rt: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  logar(){
    let login = this.login;
    let senha = this.senha;

    this.autenticacao_service
    .logar(login, senha)
    .subscribe(
      async (_res:any) =>{
        if(_res.status == 'success'){
          const alert = await this.alertController.create({
            header: 'Login realizado com sucesso!',
            buttons: [{
              text: 'OK',
              role: 'OK',
              handler: () => {
                sessionStorage.setItem('token', _res.token);
                sessionStorage.setItem('nome', _res.user.nome);
                sessionStorage.setItem('user', _res.user.login);
                sessionStorage.setItem('email', _res.user.email);
                
               
                this.rt.navigate(['/dashboard']);

                
              },
            },],
          });
      
          await alert.present();
          
        }
        else{

          const alert = await this.alertController.create({
            header: 'Usuario ou senha inválidos!',
            buttons: [{
              text: 'OK',
              role: 'OK',
              handler: () => {

              },
            },],
          });
      
          await alert.present();
          
          console.log('Erro ao realizar login: ', _res);
          
        }
      }
      )
  }
}
