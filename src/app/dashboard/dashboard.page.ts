import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle, barChart, person, personAdd, logOut} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class DashboardPage implements OnInit {

  public nome = sessionStorage.getItem('nome');
  public email = sessionStorage.getItem('email');
  public user = sessionStorage.getItem('user');

  constructor(
    private titleService: Title,
    private rt:Router
  ) { 
    addIcons({add, trash, chevronDown, personCircle, barChart, person, personAdd, logOut});
  }

  ngOnInit() {
    this.titleService.setTitle("Dashboard");
  }

  adicionarTarefa(){

    this.rt.navigate(['/criar-tarefa'])
  }

  deletarTudo(){

  }

  criarConta(){
    this.rt.navigate(['/cadastro'])
  }
 logarConta(){
    this.rt.navigate(['/login'])
  }

  logOut(){
    sessionStorage.clear();
    this.rt.navigate(['/login']);
  }

}
