import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//import { ActivatedRoute } from '@angular/router';
//import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.page.html',
  styleUrls: ['./listar-tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListarTarefaPage implements OnInit {
  public etapas: any[] = [
    { descricao: 'Etapa 1 - Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
    { descricao: 'Etapa 2 - Aliquid necessitatibus nobis iure ducimus laudantium.' },
    { descricao: 'Etapa 3 - Placeat rem reprehenderit. Iure recusandae cumque quasi.' },
    { descricao: 'Etapa 2 - Aliquid necessitatibus nobis iure ducimus laudantium.' },
    { descricao: 'Etapa 3 - Placeat rem reprehenderit. Iure recusandae cumque quasi.' },
    // Adicione mais etapas conforme necessário
  ];

  public progress = 0;
  public porcentagem = '0%';
  public checkedEtapas: boolean[] = [];

  constructor() { }

  ngOnInit() {
    // Inicializa o array de etapas checadas como false
    this.checkedEtapas = new Array(this.etapas.length).fill(false);
    this.calcularProgresso();
  }

  getEtapasArray(): number[] {
    return Array(this.etapas.length).fill(0).map((x, i) => i);
  }

  atualizarCheckbox(index: number) {
    this.calcularProgresso();
  }

  calcularProgresso() {
    const totalEtapas = this.etapas.length;
    const etapasConcluidas = this.checkedEtapas.filter(checked => checked).length;
    
    this.progress = etapasConcluidas / totalEtapas;
    this.porcentagem = Math.round(this.progress * 100) + '%';
  }
}