import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service'

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent implements OnInit {

  constructor(
    private myTitleService: TitleService
  ) { }

  ngOnInit() {
    this.myTitleService.set('Create Insert Factor Model');
  }
  
}