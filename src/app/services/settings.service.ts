import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  
  public LinkTheme = document.querySelector('#theme');

  constructor() {
    const Url = localStorage.getItem('theme') || './assets/css/colors/red.css';
    this.LinkTheme.setAttribute('href', Url);
   }

   changeTheme(color: string){
    
    const Url = `./assets/css/colors/${color}.css`;
    
    this.LinkTheme.setAttribute('href', Url);

    localStorage.setItem('theme', Url);

    this.checkCurrentTheme();

  }

  checkCurrentTheme(){

    const Links =  document.querySelectorAll('.selector');
        
    Links.forEach(elem => {
      elem.classList.remove('working');
      const BtnTheme = elem.getAttribute('data-theme');
      const BtnThemeUrl = `./assets/css/colors/${BtnTheme}.css`;
      const BtnCurrent = this.LinkTheme.getAttribute('href');

      if (BtnThemeUrl == BtnCurrent) {
          elem.classList.add('working');        
      }
    });
  }
}
