import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // userId = input.required<string>();
  // Need to enable withComponentInputBinding() in appconfing file to get hold of this user id
  // userName = '';
  userName = input.required<string>();
  message = input.required<string>();
  // private usersService = inject(UsersService);
  // private destroyRef = inject(DestroyRef);
  // private activatedRoute = inject(ActivatedRoute);
  // gives various properties that holds info about the route that has been activated by angular router like route parameters (paramMap)

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );

  // This data property provides an observable that holds merged static and dynamic data
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => console.log(data),
  //   });
  // }

  /*
  ngOnInit(): void {
    console.log('Input data: ' + this.message);
    console.log(this.activatedRoute);
    console.log(this.activatedRoute.snapshot);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  */
}

// paramMap is an observable here
/*
  activatedRoute.__            gives observables whereas
  activatedRoute.snapshot.__   gives values as objects

*/

// Everytime its associated route gets activated, this resolve fn gets called and receive the latest snapshot
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
