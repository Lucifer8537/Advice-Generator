import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  advice!: string;
  id!: number;
  deviceWidth!: number;
  desktopView!: boolean;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.deviceWidth = window.innerWidth;
    console.log('this.deviceWidth : ', this.deviceWidth);
    this.desktopView = this.deviceWidth > 767;
    console.log(this.desktopView);
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.deviceWidth = window.innerWidth;
    console.log('this.deviceWidth : ', this.deviceWidth);
    this.desktopView = this.deviceWidth > 767;
    console.log(this.desktopView);
    this.getAdvice();
  }

  getAdvice = () => {
    this.http.get('	https://api.adviceslip.com/advice').subscribe((res) => {
      const strData = JSON.stringify(res);
      const data = JSON.parse(strData);
      this.advice = data.slip.advice;
      this.id = data.slip.id;
      console.log(this.advice);
    });
  };
}
