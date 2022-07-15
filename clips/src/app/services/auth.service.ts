import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable,of } from 'rxjs';
import IUser from '../models/user.model';
import { delay, map,filter,switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute,NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signOut() {
    throw new Error('Method not implemented.');
  }
private userCollection : AngularFirestoreCollection<IUser>
public isAuthenticated$ : Observable<boolean>
public isAuthenticateWithDelay$:Observable<boolean>
private redirect = false
  
  constructor(
    private auth:AngularFireAuth,
    private db : AngularFirestore,
    private router: Router,
    private route :ActivatedRoute
  ) { 
    this.userCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)

    )
    this.isAuthenticateWithDelay$ =  this.isAuthenticated$.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe((data)=>{
      this.redirect = data?.['authOnly'] ?? false
    })

    
   
    }

  public async createUser(userData : IUser){

    if(!userData.password){
      throw new Error ("password not provided!")
      

    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData. email ,userData.password 

     )

     if(!userCred.user){
      throw  new Error("user can't be found")
     }
    await this.userCollection.doc(userCred.user.uid).set({
      name : userData.name,
      email : userData.email,
      age : userData.age,
      phoneNumber : userData.phoneNumber
     })

     userCred.user.updateProfile({
      displayName : userData.name
     })
  }
    public async logout($event:Event){
    await $event.preventDefault()
     this.auth.signOut()

     if(this.redirect){
      
     }
 
     
   }

}
