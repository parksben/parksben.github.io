import Demo from 'containers/Demo';

export const createRoutes = () => {
  const demo = {
    path: '/',
    component: Demo,
    exact: true,
  };
  return [demo];
};
