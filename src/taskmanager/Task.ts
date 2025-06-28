export interface Task {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt?: Date;

  execute: () => Promise<any>;
}
