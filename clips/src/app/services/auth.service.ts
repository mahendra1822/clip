import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import IUser from '../models/user.model';
import { delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private userCollection : AngularFirestoreCollection<IUser>
public isAuthenticated$ : Observable<boolean>
public isAuthenticateWithDelay$:Observable<boolean>
  constructor(
    private auth:AngularFireAuth,
    private db : AngularFirestore
  ) { 
    this.userCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)

    )
    this.isAuthenticateWithDelay$ =  this.isAuthenticated$.pipe(
      delay(1000)
    )
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
}
