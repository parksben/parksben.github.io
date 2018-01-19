import Home from 'containers/Home';
import TagPost from 'containers/TagPost';
import Article from 'containers/Article';

export const createRoutes = () => {
  const home = {
    path: '/',
    component: Home,
    exact: true,
  };
  const tagPost = {
    path: '/tag/:tagName',
    component: TagPost,
    exact: true,
  };
  const article = {
    path: '/post/:postName',
    component: Article,
    exact: true,
  };
  return [home, tagPost, article];
};
