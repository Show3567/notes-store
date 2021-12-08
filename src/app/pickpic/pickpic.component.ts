import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickpic',
  templateUrl: './pickpic.component.html',
  styleUrls: ['./pickpic.component.scss'],
})
export class PickpicComponent implements OnInit {
  mainpath = 'assets/PNG/';
  picknumber = [...'23456789AJKQ', '10'];
  pickcolor = [...'CDHS'];
  piclist: any = [];

  constructor() {}

  ngOnInit(): void {
    this.picknumber.forEach((num) => {
      this.pickcolor.forEach((color) => {
        this.piclist.push(num + color + '.png');
      });
    });
    console.log(this.piclist);
  }
}
