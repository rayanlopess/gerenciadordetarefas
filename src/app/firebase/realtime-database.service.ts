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




  async removeAndReindex(url: string, id: number) {
    
      // 1. Remove o item específico
      await remove(this.ref(`${url}/${id}`));
  
    }
  


  async deleteAll(path: string): Promise<boolean> {
    const dbRef = ref(this.db, path);
    await remove(dbRef); // Deleta tudo no caminho especificado
    return true;
  }

}