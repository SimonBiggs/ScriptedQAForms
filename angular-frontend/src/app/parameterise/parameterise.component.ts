import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service'

@Component({
  selector: 'app-parameterise',
  templateUrl: './parameterise.component.html',
  styleUrls: ['./parameterise.component.css']
})
export class ParameteriseComponent implements OnInit {

  constructor(
    private myTitleService: TitleService
  ) { }

  ngOnInit() {
    this.myTitleService.set('Parameterise Insert Shapes');
  }
  
}