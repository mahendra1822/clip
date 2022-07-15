import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {

@HostListener('drop',['$Event'])
@HostListener('dragover',['$Event'])
 public handleEvent(event:Event){
  event.preventDefault()

 }

}
