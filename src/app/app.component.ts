import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  labels: string[] = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOUT', 'SEPT', 'OCT', 'NOV', 'DEC'];
  datas: number[] = [55, 290, 77, 128, 45, 84, 256, 45, 123, 66, 254, 244];

  constructor() {
  }

  ngOnInit(): void {
  }

}
