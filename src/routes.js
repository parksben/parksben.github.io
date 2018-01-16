import Home from 'containers/Home';
import Article from 'containers/Article';

export const createRoutes = () => {
  const home = {
    path: '/',
    component: Home,
    exact: true,
  };
  const article = {
    path: '/post/:postName',
    component: Article,
    exact: true,
  };
  return [home, article];
};
