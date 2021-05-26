import { Component, OnInit, Input } from '@angular/core';
import { StringKey } from 'src/app/shared/constant/string.constant';

@Component({
  selector: 'app-page-info-title',
  templateUrl: './page-info-title.component.html',
  styleUrls: ['./page-info-title.component.css']
})
export class PageInfoTitleComponent implements OnInit {

  @Input() title;
  @Input() info;
  readonly stringKey = StringKey;

  constructor() { }

  ngOnInit() {
  }

}
