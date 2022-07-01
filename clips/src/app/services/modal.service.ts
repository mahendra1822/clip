import { Injectable } from '@angular/core';

interface IModal{
  id : string;
  vissible : boolean;
}

@Injectable({
  providedIn:'root'
})
export class ModalService {
  private modals:IModal[] = []

  constructor() { }

  ragister(id:string){
    this.modals.push({
      id,
      vissible:false
    })
    

  }

  isModalOpen(id:string):boolean{
    return !!this.modals.find(element => element.id===id)?.vissible
  }

  toggleModal(id:string){
    const modal = this.modals.find(element => element.id===id)
    if(modal){
      modal.vissible = !modal.vissible
    }
    ///this.vissible = !this.vissible
  }
}
