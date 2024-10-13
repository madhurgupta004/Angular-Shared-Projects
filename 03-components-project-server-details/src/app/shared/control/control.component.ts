import {
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, // To make this components' css global
  host: {
    class: 'control',
    '(click)': 'onClick()',
  }, // add these key-value pairs as properties on host element
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';
  // same as defining host property in decorator above

  label = input.required<string>();

  private el = inject(ElementRef); // To get access to host element

  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    // afterNextRender(() => {
    //   console.log('afterNextRender');
    // });
    // afterRender(() => {
    //   console.log('afterRender');
    // });
  }

  // @HostListener('click')
  onClick() {
    console.log('Clicked');
    console.log(this.el);
    console.log(this.control());
  }
}
