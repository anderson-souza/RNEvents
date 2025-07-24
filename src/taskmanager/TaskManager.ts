import { Task } from './Task';
import { addEventListener } from '@react-native-community/netinfo';
import { debounce } from 'lodash';

export class TaskManager {
  private static instance: TaskManager;
  private tasks: Map<string, Task> = new Map();
  private isTaskManagerRunning = false;

  private constructor() {}

  static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      console.log('[TASK_MANAGER] Creating a new instance of TaskManager');
      TaskManager.instance = new TaskManager();
    } else {
      console.log('[TASK_MANAGER] Returning existing instance of TaskManager');
    }
    return TaskManager.instance;
  }

  addTask(task: Task): void {
    console.log(`[TASK_MANAGER] Adding task: ${task.name} with id: ${task.id}`);
    this.tasks.set(task.id, task);
  }

  getTask(id: string): Task | undefined {
    console.log(`[TASK_MANAGER] Retrieving task with id: ${id}`);
    return this.tasks.get(id);
  }

  removeTask(id: string): void {
    console.log(`[TASK_MANAGER] Removing task with id: ${id}`);
    this.tasks.delete(id);
  }

  listTasks(): Task[] {
    console.log(
      `[TASK_MANAGER] Listing all tasks, total count: ${this.tasks.size}`,
    );
    return Array.from(this.tasks.values());
  }

  async executeTask(id: string): Promise<any> {
    const task = this.getTask(id);
    if (task) {
      return await task.execute();
    } else {
      throw new Error(`[TASK_MANAGER] Task with id ${id} not found`);
    }
  }

  async executeAllTasks() {
    console.log(
      '[TASK_MANAGER] Network is connected, executing pending tasks...',
    );
    let pendingTasks: Task[];
    do {
      pendingTasks = this.listTasks().filter(task => task.status === 'pending');
      if (pendingTasks.length === 0 || this.isTaskManagerRunning) break;

      console.log(
        `[TASK_MANAGER] Found ${pendingTasks.length} pending tasks to execute.`,
      );
      this.isTaskManagerRunning = true;
      // Execute all current pending tasks in parallel
      await Promise.all(
        pendingTasks.map(async task => {
          try {
            const result = await this.executeTask(task.id);
            console.log(
              `[TASK_MANAGER] Task ${task.name} executed successfully:`,
              result,
            );
          } catch (error) {
            console.error(
              `[TASK_MANAGER] Error executing task ${task.name}:`,
              error,
            );
          }
        }),
      );
      this.isTaskManagerRunning = false;
      // After this batch, loop again in case new tasks were added
    } while (this.listTasks().some(task => task.status === 'pending'));
  }

  unsubscribe = addEventListener(state => {
    debounce(() => {
      if (state.isConnected && state.isInternetReachable) {
        console.log('Executing tasks...');
        this.executeAllTasks();
      } else {
        console.warn(
          '[TASK_MANAGER] Network is disconnected, tasks will not be executed.',
        );
      }
    }, 5000)();
  });

  clearTaskManager(): void {
    this.tasks.clear();
    this.unsubscribe();
    console.log('[TASK_MANAGER] TaskManager cleared.');
  }
}
