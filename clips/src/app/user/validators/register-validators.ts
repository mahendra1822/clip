import { ValidationErrors,AbstractControl, ValidatorFn } from "@angular/forms";
import { ErrorFactory } from "@firebase/util";


export class RegisterValidators {
    static match(controlName:string,mactchingControlName:string):ValidatorFn{
        return (group:AbstractControl) :ValidationErrors | null => {
            const control = group.get(controlName)
            const mactchingControl = group.get(mactchingControlName)
    
    
            if(!control || !mactchingControl){
                console.error('Form controls can not be found in the form group')
                return { controlNotFound : false }
    
            }
    
            const error = control.value === mactchingControl.value ? 
            null:
            {noMatch : true}

            mactchingControl.setErrors(error)
    
            return error
            

        }
       

    }
}


///New RegsisterValidators.match() <- without static

/// RegisterValidators.match() <- with static