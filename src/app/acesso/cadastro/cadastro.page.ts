import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle} from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { RequisicaoService } from 'src/app/service/requisicao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class CadastroPage implements OnInit {

  public nome:string = '';
  public login:string = '';
  public email:string ='';
  public senha:string = '';

  constructor(
    public rs:RequisicaoService
  ) {
    addIcons({add, trash, chevronDown, personCircle});
   }

  ngOnInit() {
  }

  salvar(){  
    const fd = new FormData();
    fd.append('nome', this.nome);
    fd.append('login', this.login);
    fd.append('email', this.email);
    fd.append('senha', this.senha);

    this.rs.post(fd)
    .subscribe();
  }

}
