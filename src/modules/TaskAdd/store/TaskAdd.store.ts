import { action, computed, makeObservable, observable } from 'mobx';
import { TaskAddEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';

type PrivateFields = '_isTasksLoading';

export class TasksAddStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isTasksLoading: observable,

      isTasksLoading: computed,

      createTask: action,
    });
  }

  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  createTask = async (newTask: TaskAddEntity) => {
    this._isTasksLoading = true;

    try {
      await TaskAgentInstance.createTask(newTask);
      return true;
    } catch {
      return false;
    } finally {
      this._isTasksLoading = false;
    }
  };
}

export const TaskAddInstance = new TasksAddStore();
