import { Task } from './Task';
import { addEventListener } from '@react-native-community/netinfo';

export class TaskManager {
  private static instance: TaskManager;
  private tasks: Map<string, Task> = new Map();
  private isTaskManagerRunning = false;

  private constructor() {}

  static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  addTask(task: Task): void {
    this.tasks.set(task.id, task);
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  removeTask(id: string): void {
    this.tasks.delete(id);
  }

  listTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  async executeTask(id: string): Promise<any> {
    const task = this.getTask(id);
    if (task) {
      return await task.execute();
    } else {
      throw new Error(`Task with id ${id} not found`);
    }
  }

  async executeAllTasks() {
    console.log('Network is connected, executing pending tasks...');
    let pendingTasks: Task[];
    do {
      pendingTasks = this.listTasks().filter(task => task.status === 'pending');
      if (pendingTasks.length === 0 || this.isTaskManagerRunning) break;

      console.log(`Found ${pendingTasks.length} pending tasks to execute.`);
      this.isTaskManagerRunning = true;
      // Execute all current pending tasks in parallel
      await Promise.all(
        pendingTasks.map(async task => {
          try {
            const result = await this.executeTask(task.id);
            console.log(`Task ${task.name} executed successfully:`, result);
          } catch (error) {
            console.error(`Error executing task ${task.name}:`, error);
          }
        }),
      );
      this.isTaskManagerRunning = false;
      // After this batch, loop again in case new tasks were added
    } while (this.listTasks().some(task => task.status === 'pending'));
  }

  unsubscribe = addEventListener(state => {
    if (state.isConnected && state.isInternetReachable) {
      this.executeAllTasks();
    } else {
      console.warn('Network is disconnected, tasks will not be executed.');
    }
  });

  clearTaskManager(): void {
    this.tasks.clear();
    this.unsubscribe();
    console.log('TaskManager cleared.');
  }
}
