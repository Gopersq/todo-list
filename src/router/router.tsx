import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TasksPage, TasksEditPage, TasksAddPage } from 'pages/index';
import { PATH_LIST } from 'constants/index';

export const Router = () => {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TasksPage />} />
      <Route path={PATH_LIST.EDIT} element={<TasksEditPage />} />
      <Route path={PATH_LIST.ADD} element={<TasksAddPage />} />
    </Routes>
  );
};
