import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  // Implement OnInit interface to save ourselves from
  // typo errors like defining ngonInit with small o.

  // currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  // currentStatus can now take only these 3 values

  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  private destroyRef = inject(DestroyRef);

  // It runs without initializing component's inputs
  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  // Recommended way for initialization work
  // It runs after initializing component's inputs
  ngOnInit() {
    console.log('ON INIT');
    const interval = setInterval(() => {
      const rnd = Math.random(); // Generates random value between [0, 1)

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT: Server-Status');
  }
}
