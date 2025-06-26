import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizarTarefaPage } from './atualizar-tarefa.page';

describe('AtualizarTarefaPage', () => {
  let component: AtualizarTarefaPage;
  let fixture: ComponentFixture<AtualizarTarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
