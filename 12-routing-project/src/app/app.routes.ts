import {
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  // if (shouldGetAccess < 0.5) {
  if (shouldGetAccess) {
    return true;
  }
  // return false; // Shold redirect to some other route in false case
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task Selected', // To show in the tab
  },
  // {
  //   path: 'tasks', // <your-domain>/tasks
  //   component: TasksComponent,
  // },
  {
    // Setting up dynamic paths (colon tells angular that this is dynamic segment here)
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch], // It is a route guard
    // canActivate: [] Runs at later point of time, after this route has been identified as matching, but before the component has been loaded

    data: {
      message: 'Hello!',
    },
    // Provided as an input to the component
    // Setting static data to a route, and we can access this data in the usertaskscomponent
    // Using resolve to provide dynamic data
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**', // If no other path matches
    component: NotFoundComponent, // Fallback component
  },
];

// Routes are resolved from top to bottom
// Simple should be at top and complex ones at bottom.
