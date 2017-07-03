import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service'

@Component({
  selector: 'app-use-model',
  templateUrl: './use-model.component.html',
  styleUrls: ['./use-model.component.css']
})
export class UseModelComponent implements OnInit {

  constructor(
    private myTitleService: TitleService
  ) { }

  ngOnInit() {
    this.myTitleService.set('Use Insert Factor Model');
  }

}