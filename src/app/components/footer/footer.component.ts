import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  getDate = new Date();
  getYear = this.getDate.getFullYear();
  
}
