import { Component } from '@angular/core';
import { FindDominantColor } from './helper/find-dominant-color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  source = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8tOUTr9UaErM7RIJgm2UnP9-_bM_z8LNsKL14Y88KNCdrTC4FUet5FlU&s';

  constructor() {
    let img = document.createElement('img');
    img.setAttribute('src', this.source);
    img.crossOrigin = "Anonymous";
    img.addEventListener('load', function () {
      let findDominantColor = new FindDominantColor();
      let dColor = findDominantColor.getDominantColor(img, 10);
      console.log(dColor);
    });
  }
}
