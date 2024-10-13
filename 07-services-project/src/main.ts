import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

export const TasksServiceToken = new InjectionToken<TasksService>(
  'tasks-service-token'
);

// bootstrapApplication(AppComponent).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  // providers: [TasksService],
  providers: [{ provide: TasksServiceToken, useClass: TasksService }],
  // using custom injection token
}).catch((err) => console.error(err));

// In this approach, TasksService gets included when the app starts,
// leading to larger initial codebase and poor optimization.
// So other approach of using @Injectable is better.

/*
provider: [TasksService]
    is same as
provider: [{provide, }]
 - provide property registers injection token of the injectable
 - Injection token is like the identifier of the injectable
*/
