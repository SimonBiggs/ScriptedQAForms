import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private myTitleService: TitleService
  ) { }

  ngOnInit() {
    this.myTitleService.set('Create and Edit Forms');
  }

}