import { FILTER_TYPES } from 'constants/index';

export interface TaskAddEntity {
  name: string;
  info: string;
  isImportant: boolean;
}

export interface TaskEntity extends TaskAddEntity {
  isDone: boolean;
  id: string;
}

export interface TasksStatsEntity {
  total: number;
  important: number;
  done: number;
}

export type FiltersType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];

export interface SearchFormEntity {
  searchValue: string;
  filterType: FiltersType;
}
