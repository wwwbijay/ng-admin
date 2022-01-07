/**
 * Menu Data source
 */
export let mainDataSource: any[] = [
  {
    title: 'Dashboard',
    link: '',
  },
  {
    title: 'Horoscope',
    link: 'horoscope',
    submenu: [
      {
        title: 'Manage Horoscope',
        link: 'horoscope',
      },
      {
        title: 'Daily Update',
        link: 'horoscope/update-daily',
      },
      {
        title: 'Weekly Update',
        link: 'horoscope/update-weekly',
      },
      {
        title: 'Monthly Update',
        link: 'horoscope/update-monthly',
      },
      {
        title: 'Yearly Update',
        link: 'horoscope/update-yearly',
      },
    ],
  },
  {
    title: 'User Management',
    link: 'user-management',
    submenu: [
      {
        title: 'All Users',
        link: 'user-management',
      },
      {
        title: 'User Roles',
        link: 'user-management/user-roles',
      },
    ],
  },
  
];
