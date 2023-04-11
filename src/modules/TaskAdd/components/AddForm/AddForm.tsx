import React, { ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { validateSchema } from './AddForm.validation';
import { DEFAULT_VALUES } from './AddForm.utils';
import { TaskAddInstance } from 'modules/TaskAdd/store';
import { TextField, Checkbox } from 'components/index';
import { PATH_LIST } from 'constants/index';

export const AddFormProto = () => {
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validateSchema),
  });

  const navigate = useNavigate();

  const { createTask, isTasksLoading } = TaskAddInstance;

  const onSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSubmit(async (data) => {
      const res = await createTask(data);
      if (res) navigate(PATH_LIST.ROOT);
      reset();
    })();
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value);

  const onInfoChange = (e: ChangeEvent<HTMLInputElement>) => setValue('info', e.target.value);

  const onIsImportant = (e: ChangeEvent<HTMLInputElement>) => setValue('isImportant', e.target.checked);

  return (
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
        render={({ field }) => <Checkbox label="Importanat" checked={field.value} onChange={onIsImportant} />}
      />
      <button disabled={isTasksLoading} type="submit" className="btn btn-secondary d-block ml-auto">
        Add Task
      </button>
    </form>
  );
};

export const AddForm = observer(AddFormProto);
