import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
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
  },
  {
    path: '**', // If no other path matches
    component: NotFoundComponent, // Fallback component
  },
];

// Routes are resolved from top to bottom
// Simple should be at top and complex ones at bottom.
