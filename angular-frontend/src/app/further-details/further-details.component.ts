import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service'

@Component({
  selector: 'app-further-details',
  templateUrl: './further-details.component.html',
  styleUrls: ['./further-details.component.css']
})
export class FurtherDetailsComponent implements OnInit {

  constructor(
    private myTitleService: TitleService
  ) { }

  ngOnInit() {
    this.myTitleService.set('Further Details');
  }

}
