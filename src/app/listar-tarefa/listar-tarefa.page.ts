import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.page.html',
  styleUrls: ['./listar-tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TarefaPage implements OnInit {
  tarefaId: string = '101';
  etapas: any[] = [];
  progresso = 0;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    //this.tarefaId = this.route.snapshot.paramMap.get('id');
    this.carregarEtapas();
  }

  carregarEtapas() {
    this.firestore.collection('tarefas').doc(this.tarefaId).collection('etapas')
      .valueChanges()
      .subscribe((etapas: any[]) => {
        this.etapas = etapas;
        this.calcularProgresso();
        this.carregando = false;
      });
  }

  atualizarEtapa(etapa: any) {
    this.firestore.collection('tarefas').doc(this.tarefaId)
      .collection('etapas').doc(etapa.id).update({
        concluida: !etapa.concluida
      });
  }

  calcularProgresso() {
    if (this.etapas.length === 0) {
      this.progresso = 0;
      return;
    }
    
    const concluidas = this.etapas.filter(e => e.concluida).length;
    this.progresso = Math.round((concluidas / this.etapas.length) * 100);
  }
}