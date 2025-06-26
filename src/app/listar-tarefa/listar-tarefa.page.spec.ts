import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarTarefaPage } from './listar-tarefa.page';

describe('ListarTarefaPage', () => {
  let component: ListarTarefaPage;
  let fixture: ComponentFixture<ListarTarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
