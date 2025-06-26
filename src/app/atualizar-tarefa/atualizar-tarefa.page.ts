import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-atualizar-tarefa',
  templateUrl: './atualizar-tarefa.page.html',
  styleUrls: ['./atualizar-tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AtualizarTarefaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
