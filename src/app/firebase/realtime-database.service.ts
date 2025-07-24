import { inject, Injectable } from '@angular/core';
import { Database, ref, list, set, onValue, remove, get, update } from '@angular/fire/database';
import { firstValueFrom, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  constructor(
    private db: Database = inject(Database)
  ) { }

  ref(url: string){
    return ref(this.db, url);
  }

  list(url: string){
    return list(this.ref(url));
  }


  async getById(url: string, id: number): Promise<any> {
    const snapshot = await get(this.ref(`${url}/${id}`));
    return snapshot.exists() ? snapshot.val() : null;
  }




  add(url:string, data: any, id:number = 0){
    return from(
      (async () =>{
        let indice = 0;
        const snapshot:any = await firstValueFrom(this.list(url));

        if(snapshot !== undefined){
          indice = snapshot.length + 1;
        }

        const url_indice = id == 0 ? indice : id;
        const url_full = `${url}/${url_indice}`;
        const ref = this.ref(url_full);

        return set(ref, data)
      })()
    );
  }




  async update(path: string, id: string | number, data: any) {
    const dbRef = ref(this.db, `${path}/${id}`);
    try {
      await update(dbRef, data); // Atualiza apenas os campos especificados
      return true; // Sucesso
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      return false; // Falha
    }
  }

  // Seu método query já existente (para leitura em tempo real)
  query(url: string, callback: any) {
    return onValue(ref(this.db, url), callback);
  }




  async delete(url: string, id: number) {
    
      
      await remove(this.ref(`${url}/${id}`));
  
    }
  


async deleteUserTasks(userId: string) {
    const dbRef = ref(this.db, 'tarefas');
    
    try {
        // 1. Busca todas as tarefas
        const snapshot = await get(dbRef);
        
        if (!snapshot.exists()) {
            console.log("Nenhuma tarefa encontrada.");
            return false;
        }

        const tasks = snapshot.val();
        let deletedAny = false; // Flag para verificar se pelo menos uma tarefa foi deletada

        // 2. Itera sobre as tarefas e deleta as do usuário logado
        for (const taskId in tasks) {
            if (tasks[taskId].responsavel === userId) {
                const taskRef = ref(this.db, `tarefas/${taskId}`);
                await remove(taskRef); // Deleta a tarefa específica
                deletedAny = true;
            }
        }

        // 3. Retorna true se pelo menos uma tarefa foi deletada
        if (deletedAny) {
            console.log(`Tarefas do usuário ${userId} deletadas com sucesso.`);
            return true;
        } else {
            console.log("Nenhuma tarefa encontrada para este usuário.");
            return false;
        }
    } catch (error) {
        console.error("Erro ao deletar tarefas:", error);
        return false;
    }
}

}