import Home from 'containers/Home';

export const createRoutes = () => {
  const home = {
    path: '/',
    component: Home,
    exact: true,
  };
  return [home];
};
