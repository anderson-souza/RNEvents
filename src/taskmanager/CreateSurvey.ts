import { Task } from './Task';

export class CreateSurvey implements Task {
  id: string;
  name: string;
  description?: string | undefined;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt?: Date | undefined;

  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = 'pending';
    this.createdAt = new Date();
  }

  execute() {
    this.status = 'in-progress';
    return new Promise((resolve, reject) => {
      // Simulate survey creation logic
      setTimeout(() => {
        this.status = 'completed';
        this.updatedAt = new Date();
        resolve(`Survey ${this.name} created successfully.`);
      }, 2000);
    });
  }
}
