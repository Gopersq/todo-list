import React, { ChangeEvent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { validateSchema } from './TaskEdit.validation';
import { DEFAULT_VALUES } from './TaskEdit.utils';
import { TaskEditStoreInstance } from 'modules/TaskEdit/store';
import { TextField, Checkbox } from 'components/index';
import { TaskEntity } from 'domains/index';
import { PATH_LIST } from 'constants/index';

export const TaskEditFormProto = () => {
  const { handleSubmit, control, setValue, reset, watch } = useForm<TaskEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validateSchema),
  });

  const navigate = useNavigate();

  const { isTasksLoading, updateTask, getTask } = TaskEditStoreInstance;

  const { taskId } = useParams();

  const isDone = watch('isDone');

  useEffect(() => {
    TaskEditStoreInstance.taskId = taskId || '';
    getTask().then((data) => {
      reset(data);
    });
  }, []);

  const onSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSubmit(async (data) => {
      const res = await updateTask(data);
      if (res) navigate(PATH_LIST.ROOT);
      reset();
    })();
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value);

  const onInfoChange = (e: ChangeEvent<HTMLInputElement>) => setValue('info', e.target.value);

  const onIsImportant = (e: ChangeEvent<HTMLInputElement>) => setValue('isImportant', e.target.checked);

  const onIsDone = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isImportant', false);
    setValue('isDone', e.target.checked);
  };

  return (
    <>
      <h1>TODO LIST | EDIT TASK {taskId}</h1>

      <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Task name"
              value={field.value}
              onChange={onNameChange}
              inputType="text"
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="WhatToDo"
              value={field.value}
              onChange={onInfoChange}
              inputType="text"
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <Checkbox
              label="Importanat"
              checked={field.value}
              onChange={onIsImportant}
              disabled={isDone ? true : false}
            />
          )}
        />
        <Controller
          control={control}
          name="isDone"
          render={({ field }) => <Checkbox label="Completed" checked={field.value} onChange={onIsDone} />}
        />
        <button disabled={isTasksLoading} type="submit" className="btn btn-secondary d-block ml-auto">
          Edit task
        </button>
      </form>
    </>
  );
};

export const TaskEditForm = observer(TaskEditFormProto);
