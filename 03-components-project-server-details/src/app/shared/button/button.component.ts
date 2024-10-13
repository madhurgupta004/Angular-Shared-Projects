import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]', // use it to extend a built-in component
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  
}
