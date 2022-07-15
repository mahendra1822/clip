import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
///import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(
    public Modal:ModalService,
    public  auth : AuthService,
   /// private afauth : AngularFireAuth,
    private router : Router
    ) {
     
     }

  ngOnInit(): void {
  }

  openModal($event:Event){
    $event.preventDefault()

    this.Modal.toggleModal('auth')

  }

  async logout($event?:Event){
    if($event){
      await $event.preventDefault()

    }
   
    this.auth.signOut()

    await this.router.navigateByUrl('/')
  }

}
