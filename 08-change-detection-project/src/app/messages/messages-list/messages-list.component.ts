import { AsyncPipe } from '@angular/common';
import { MessagesService } from './../messages.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  // messages = input.required<string[]>();
  private messagesService = inject(MessagesService);
  messages = this.messagesService.allMessages;

  // messages$ = this.messagesService.messages$;

  /*
  ----------Without using async pipe-----------
  private cdRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  messages: string[] = [];

  ngOnInit(): void {
    const subscription = this.messagesService.messages$.subscribe(
      (messages) => {
        this.messages = messages;
        this.cdRef.markForCheck();
        // To make sure to run change detection
      }
    );
    // To setup a subcription
    // Callback is executed whenever a new value is emitted by message$

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe(); // To close the subcription in case the component gets destroyed
    });
  }

  */

  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
