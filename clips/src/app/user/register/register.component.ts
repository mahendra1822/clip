import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(
    private auth: AuthService
 
    ){}

  inSubmission = false
  name = new FormControl('',[
    Validators.required,
    Validators.minLength(3)
   
  ])
  email = new FormControl('',[
    Validators.required,
    Validators.email

  ])
  age = new FormControl<number | null>(null,[
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('',[
    Validators.required

  ])
  PhoneNumber = new FormControl('',[
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert =  false
  alertMsg = 'Please Wait ! Your account being created'
  alertcolor = 'blue'

  ragisterForm =  new FormGroup({

    name:this.name,
    email:this.email,
    age:this.age,
    password:this.password,
    confirm_password:this.confirm_password,
    PhoneNumber:this.PhoneNumber
    
  })

  async register(){
    this.showAlert=true
    this.alertMsg = 'Please Wait ! Your account being created'
    this.alertcolor = 'blue'

    this.inSubmission = true

    try {
      await this.auth.createUser(this.ragisterForm.value as IUser)
    
    }catch(e){
      console.error(e)

      this.alertMsg = 'An unexpected error occured.Please try again later '
      this.alertcolor  = 'red'
      this.inSubmission = false
      return

    }
    this.alertMsg = 'Success! Your account has been created'
    this.alertcolor = 'green'
  }
}

