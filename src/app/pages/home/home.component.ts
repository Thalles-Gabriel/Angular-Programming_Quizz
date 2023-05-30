import { Component, OnInit } from '@angular/core';
import * as apiParameters from '../../data/apiParameters'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parameters = apiParameters
  difficulty:string = ''
  category:string = ''
  limit:string = ''

  constructor() { }

  ngOnInit(): void {
  }

  setCategory(event:Event) {
    const field = event.target as HTMLInputElement
    this.category = field.value
  }

  setDifficulty(event:Event) {
    const field = event.target as HTMLInputElement
    this.difficulty = field.value
  }

  setLimit(event:Event) {
    const field = event.target as HTMLInputElement
    this.limit = field.value
  }

}
