import { action, computed, makeObservable, observable } from 'mobx';
import { DEFAULT_VALUES } from '../components';
import { TaskEntity } from 'domains/Task.entity';
import { TaskAgentInstance } from 'http/index';
import { mapTpInternalTask } from 'helpers/index';

type PrivateFields = '_task' | '_taskId' | '_isTasksLoading';

export class TaskEditStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _taskId: observable,
      _isTasksLoading: observable,

      task: computed,
      isTasksLoading: computed,
      taskId: computed,

      getTask: action,
      updateTask: action,
    });
  }

  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  private _taskId = '';

  get taskId() {
    return this._taskId;
  }

  set taskId(value: TaskEntity['id']) {
    this._taskId = value;
  }

  private _task = DEFAULT_VALUES;

  get task(): TaskEntity {
    return this._task;
  }

  getTask = async () => {
    const res = await TaskAgentInstance.getTask(this._taskId);
    return mapTpInternalTask(res);
  };

  updateTask = async (task: TaskEntity) => {
    this._isTasksLoading = true;

    try {
      await TaskAgentInstance.updateTask(this._taskId, task);
      return true;
    } catch {
      return false;
    } finally {
      this._isTasksLoading = false;
    }
  };
}

export const TaskEditStoreInstance = new TaskEditStore();
