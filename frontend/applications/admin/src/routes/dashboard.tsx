import Dashboard from '../views/Dashboard/Dashboard';
import Icons from '../views/Icons/Icons';
import Notifications from '../views/Notifications/Notifications';
import Typography from '../views/Typography/Typography';
import Upgrade from '../views/Upgrade/Upgrade';
import UserProfile from '../views/UserProfile/UserProfile';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'pe-7s-graph',
    component: Dashboard
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: 'pe-7s-user',
    component: UserProfile
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'pe-7s-news-paper',
    component: Typography
  },
  { path: '/icons', name: 'Icons', icon: 'pe-7s-science', component: Icons },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'pe-7s-bell',
    component: Notifications
  },
  {
    upgrade: true,
    path: '/upgrade',
    name: 'Upgrade to PRO',
    icon: 'pe-7s-rocket',
    component: Upgrade
  },
  { redirect: true, path: '/', to: '/dashboard', name: 'Dashboard' }
];

export default dashboardRoutes;
