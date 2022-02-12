import { Component } from '@angular/core';
import { FindDominantColor } from './helper/find-dominant-color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  imageUrl = '';
  colorCode = '';

  constructor() { }

  getColorCode() {
    let img = document.createElement('img');
    img.setAttribute('src', this.imageUrl);
    img.crossOrigin = "Anonymous";
    img.addEventListener('load', () => {
      let findDominantColor = new FindDominantColor();
      let dColor = findDominantColor.getDominantColor(img, 10);
      this.colorCode = dColor;
    });
  }
}
