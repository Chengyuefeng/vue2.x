
const routes  = [
  {
    path: '/',
    name: 'layouts',
    component: () => import('@/layouts'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/config')
      }
    ]
  }
]

export default routes