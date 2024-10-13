import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  /*
  providers: [TasksService], // Registering it with ElementInjector
  // It's child components now have access to this injectable,
  // but parents or other components like AppComponent don't
  */
})
export class TasksComponent {}
