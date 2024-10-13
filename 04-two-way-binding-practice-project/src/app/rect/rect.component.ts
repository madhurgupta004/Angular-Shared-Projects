import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  /* Older approach
  @Input({ required: true }) size!: {
    width: string;
    height: string;
  };
  @Output() sizeChange = new EventEmitter<{
    width: string;
    height: string;
  }>();

  // Naming should be like this:
  // size for input and sizeChange for output,
  // to tell angular that this is 2 way binding
  */

  size = model.required<{
    width: string;
    height: string;
  }>(); // Now size is 2 way bindable

  onReset() {
    // this.sizeChange.emit({
    //   width: '200',
    //   height: '100',
    // });

    this.size.set({
      width: '200',
      height: '100',
    });
  }
}
