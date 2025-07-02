import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';


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

  ) { }

  ngOnInit() {
  }

  logar(){
    let login = this.login;
    let senha = this.senha;

  }
}
