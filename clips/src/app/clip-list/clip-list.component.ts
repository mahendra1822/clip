import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css'],
  providers : [DatePipe]
})
export class ClipListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true

  constructor(public clipservice : ClipService) {
    this.clipservice.getClips()
   }

  ngOnInit() {
    if(this.scrollable){
      window.addEventListener('scroll', this.handleScroll)
    }
    window.addEventListener('scroll', this.handleScroll)
  }

  ngOnDestroy() {
    if(this.scrollable){
    window.removeEventListener('scroll', this.handleScroll)
    }

    this.clipservice.pageClips = []
  }

  handleScroll= () => {
    const {scrollTop , offsetHeight} = document.documentElement
    const {innerHeight} = window

    const bottomofWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if(bottomofWindow) {
      console.log('bottom of window')
    }
  }

}
