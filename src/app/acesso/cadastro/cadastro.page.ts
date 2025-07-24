import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { RequisicaoService } from 'src/app/service/requisicao.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class CadastroPage implements OnInit {

  public nome: string = '';
  public login: string = '';
  public email: string = '';
  public senha: string = '';

  constructor(
    public rs: RequisicaoService,
    public alertController: AlertController,
    public rt: Router
  ) {
    addIcons({ add, trash, chevronDown, personCircle });
  }

  ngOnInit() {
  }

  async salvar() {
    if(this.nome == "" || this.login == ""|| this.email == "" || this.senha == ""){
      const alert = await this.alertController.create({
      header: 'Preencha os campos corretamente!',
      buttons: [{
        text: 'OK',
        role: 'OK',
        handler: () => {
        },
      }],
    });

    await alert.present();


    }
    else{
      const alert = await this.alertController.create({
      header: 'Usuário cadastrado com sucesso!',
      buttons: [{
        text: 'OK',
        role: 'OK',
        handler: () => {

          const fd = new FormData();
          fd.append('nome', this.nome);
          fd.append('login', this.login);
          fd.append('email', this.email);
          fd.append('senha', this.senha);
          fd.append('controller', 'cadastro-usuario');

          this.rs.post(fd)
            .subscribe();


          this.rt.navigate(['/login']);

        },
      }],
    });

    await alert.present();


    }
  }

}
