import React from 'react';
import { Link } from 'react-router-dom';
import { Tasks } from 'modules/index';
import { PageContainer } from 'components/index';
import { PATH_LIST } from 'constants/index';

export const TasksPage = () => {
  return (
    <PageContainer>
      <h1>TODO LIST</h1>
      <Tasks />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ADD}>
        Add task
      </Link>
    </PageContainer>
  );
};
