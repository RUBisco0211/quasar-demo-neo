import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/admin',
        children: [
            {
                path: '/admin',
                name: 'admin',
                redirect: '/admin/dashboard',
                component: () => import('src/layouts/MainLayout.vue'),
                children: [
                    {
                        path: '/admin/dashboard',
                        name: 'dashboard',
                        meta: {
                            icon: 'mdi-monitor-dashboard',
                            label: '控制面板',
                        },
                        component: () =>
                            import('src/pages/service/DashBoard.vue'),
                    },
                    {
                        path: '/admin/user',
                        name: 'user',
                        meta: {
                            icon: 'eva-people-outline',
                            label: '用户管理',
                        },
                        component: () =>
                            import('src/pages/service/UserManage.vue'),
                    },
                    {
                        path: '/admin/workspace',
                        name: 'workspace',
                        meta: {
                            icon: 'mdi-xml',
                            label: '工作区',
                        },
                        component: () =>
                            import('src/pages/service/WorkSpace.vue'),
                    },
                    {
                        path: '/admin/document',
                        name: 'document',
                        meta: {
                            icon: 'eva-file-text-outline',
                            label: '文档',
                        },
                        component: () =>
                            import('src/pages/service/Document.vue'),
                    },
                    {
                        path: '/admin/data',
                        name: 'data',
                        meta: {
                            icon: 'eva-pie-chart-outline',
                            label: '数据',
                        },
                        component: () =>
                            import('src/pages/common/EmptyPage.vue'),
                    },
                    {
                        path: '/admin/calendar',
                        name: 'calendar',
                        meta: {
                            icon: 'mdi-calendar-badge-outline',
                            label: '日历',
                        },
                        component: () =>
                            import('src/pages/service/Calendar.vue'),
                    },
                    {
                        path: '/admin/chat',
                        name: 'chat',
                        meta: {
                            icon: 'eva-message-circle-outline',
                            label: '对话',
                            separate: true,
                        },
                        component: () => import('src/pages/service/Chat.vue'),
                    },
                    {
                        path: '/admin/setting',
                        name: 'setting',
                        meta: {
                            icon: 'eva-settings-2-outline',
                            label: '设置',
                        },
                        component: () =>
                            import('src/pages/common/EmptyPage.vue'),
                    },
                    {
                        path: '/admin/about',
                        name: 'about',
                        meta: {
                            icon: 'eva-info-outline',
                            label: '关于',
                        },
                        component: () =>
                            import('src/pages/common/EmptyPage.vue'),
                    },
                ],
            },
            {
                path: '/login',
                name: 'login',
                meta: {
                    label: '登录',
                },
                component: () => import('src/pages/auth/LoginPage.vue'),
            },
            {
                path: '/signup',
                name: 'signup',
                meta: {
                    label: '注册',
                },
                component: () => import('src/pages/auth/SignupPage.vue'),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        meta: {
            label: '该页面不存在',
        },
        component: () => import('pages/common/ErrorNotFound.vue'),
    },
];

export default routes;
