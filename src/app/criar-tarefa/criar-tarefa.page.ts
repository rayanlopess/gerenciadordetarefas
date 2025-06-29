import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  


import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle} from 'ionicons/icons';


import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.page.html',
  styleUrls: ['./criar-tarefa.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CriarTarefaPage implements OnInit {
  public quantidade: Array<number> = [
    1,
    2,
    3,
    4,
    5
  ];
  constructor(
    private titleService: Title,
    private rt:Router
  ) {
    addIcons({add, trash, chevronDown, personCircle})
   }

  ngOnInit() {
    this.titleService.setTitle("Adicionar Tarefa");
  }

}
