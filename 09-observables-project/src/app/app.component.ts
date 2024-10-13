import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); // var$: common notation for observables
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); // Observable to signal
  // Default initial value is undefined, pass 2nd parameter to different properties.
  // When this component gets removed, toSignal Automatically cleans up the observable subscription

  private destroyRef = inject(DestroyRef);

  // Creating custom observable now
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error(); // to throw an error

      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({ message: 'New Value' }); // tells when to genereate next value
      timesExecuted++;
    }, 2000);
  });

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // }); // this callback will automatically be re-executed, whenever any signal used in here updates
    // toObservable(this.clickCount); // Signal to observable
  }

  ngOnInit(): void {
    /*
    ------------ Creating a subscription for an observable --------------
    const subscription = interval(1000)
      .pipe(map((val) => val * val))
      .subscribe({
        next: (val) => console.log(val),
        // complete: () => {}
        // error: () => {}
      });

    // Creates an observable that emits sequential numbers
    // every specified interval(1000 milliseconds) of time.

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    */

    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('COMPLETED!!!'),
      // error: (err) => console.log(err);
    });

    const subscription = this.clickCount$.subscribe((val) =>
      console.log(`Clicked button ${this.clickCount()} times`)
    ); // When next value is generated, this will be executed

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
