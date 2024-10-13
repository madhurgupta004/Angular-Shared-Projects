import { ButtonComponent } from './../../../shared/button/button.component';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  output,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // @Output() add = new EventEmitter();
  add = output<{ title: string; text: string }>();

  enteredTitle = '';
  enteredText = '';

  // onSubmit(titleElement: HTMLInputElement) {
  // onSubmit(title: string, ticketText: string) {   // Without 2way binding
  onSubmit() {
    // console.log(titleElement); // outputs as element
    // console.dir(titleElement); // outputs as object
    // console.log('ENTERED TITLE: ' + titleElement.value);
    // console.log(title);
    // console.log(ticketText);
    // this.add.emit({ title: title, text: ticketText });  // Without 2 way binding
    // this.form?.nativeElement.reset(); // To reset the form  // Without 2 way binding

    this.add.emit({
      title: this.enteredTitle,
      text: this.enteredText,
    });
    this.enteredText = '';
    this.enteredTitle = '';
  }

  ngOnInit(): void {
    console.log('ON INIT: New-Ticket');
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT: New-Ticket');
    console.log(this.form?.nativeElement);
  }
}
