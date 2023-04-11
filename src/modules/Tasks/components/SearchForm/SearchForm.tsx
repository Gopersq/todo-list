import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { StatusFilter } from '../StatusFilter';
import { DEFAULT_VALUES } from './SearchForm.utils';
import { SearchInput } from 'components/index';
import { FiltersType } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store';

export function SearchFormProto() {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const { isTasksLoading, loadTasks } = TasksStoreInstance;

  const onSearchInputChange = (value: string) => {
    setValue('searchValue', value);
  };

  const onReset = () => {
    setValue('searchValue', '');
  };

  const onFilterChange = (type: FiltersType) => {
    setValue('filterType', type);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSubmit((data) => {
      loadTasks(data);
    })();
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput disabled={isTasksLoading} value={field.value} onChange={onSearchInputChange} onReset={onReset} />
        )}
      />
      <Controller
        control={control}
        name="filterType"
        render={({ field }) => (
          <StatusFilter disabled={isTasksLoading} tasksType={field.value} onChange={onFilterChange} />
        )}
      />
      <button type="submit" className="btn btn-primary" onClick={onSubmit} disabled={isTasksLoading}>
        Find
      </button>
    </form>
  );
}

export const SearchForm = observer(SearchFormProto);
