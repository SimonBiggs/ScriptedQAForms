import { Component, OnInit } from '@angular/core';

import * as  MarkdownIt from 'markdown-it';

import { TitleService } from '../title.service'


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  teststring = "TEST"
  private myMarkdownIt = new MarkdownIt()

  constructor(
    private myTitleService: TitleService
  ) { }

  ngOnInit() {
    this.myTitleService.set('View Written Results');
    this.teststring = this.myMarkdownIt.render("# It works?")
  }

}