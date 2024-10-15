import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    // pathMatch: 'full',
    // full matches the full path whereas prefix just checks if a url starts with given path
  },
  {
    path: 'tasks',
    component: TasksComponent,
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
    // by default resolver fn gets executed when route parameters change not queryparameters
    // To trigger them on change of queryparameter, use runGuardsAndResolvers
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage], // prevents unintended page changes before they are even initialized
  },
];
// setting up child/nested routes
// By default, Child routes do not receive path parameters as input.
