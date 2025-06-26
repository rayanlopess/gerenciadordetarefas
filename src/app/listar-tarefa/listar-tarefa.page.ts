import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.page.html',
  styleUrls: ['./listar-tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListarTarefaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
