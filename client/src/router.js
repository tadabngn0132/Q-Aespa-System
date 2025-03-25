import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/student'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/admin',
        component: () => import('@/layouts/AdminLayout.vue'),
        meta: { 
            requiresAuth: true,
            adminOnly: true
        },
        children: [
            {
                path: '',
                name: 'AdminDashboard',
                component: () => import('@/views/admin/Dashboard.vue')
            },
            {
                path: '/admin/questions',
                name: 'AdminQuestions',
                component: () => import('@/views/admin/Questions.vue')
            }, 
            {
                path: '/admin/askquestion',
                name: 'QuestionForm',
                component: () => import('@/views/admin/AskQuestion.vue')
            },
            {
                path: '/admin/editquestion',
                name: 'editQuestion',
                component: () => import('@/views/admin/EditQuestion.vue')
            },
            {
                path: '/admin/questions/:id',
                name: 'AdminQuestionDetail',
                component: () => import('@/views/admin/QuestionDetail.vue')
            },
            {
                path: '/admin/users',
                name: 'AdminUsers',
                component: () => import('@/views/admin/Users.vue')
            },
            {
                path: '/admin/users/:id',
                name: 'AdminUserDetail',
                component: () => import('@/views/admin/UserDetail.vue')
            },
            {
                path: '/admin/createuser',
                name: 'CreateUser',
                component: () => import('@/views/admin/CreateUser.vue')
            },
            {
                path: '/admin/edituser',
                name: 'UpdateUser',
                component: () => import('@/views/admin/UpdateUser.vue')
            },
            {
                path: '/admin/tags',
                name: 'AdminTags',
                component: () => import('@/views/admin/Tags.vue')
            },
            {
                path: '/admin/tags/:id',
                name: 'tagDetail',
                component: () => import('@/views/admin/TagDetail.vue')
            },
            {
                path: '/admin/updatetag/:id',
                name: 'UpdateTag',
                component: () => import('@/views/admin/EditTag.vue')
            },
            {
                path: '/admin/createtag',
                name: 'CreateTag',
                component: () => import('@/views/admin/CreateTag.vue')
            }
        ]
    },
    {
        path: '/student',
        component: () => import('@/layouts/StudentLayout.vue'),
        meta: { allowGuest: true },
        children: [
            {
                path: '',
                name: 'StudentHome',
                component: () => import('@/views/student/Home.vue')
            },
            {
                path: '/student/questions',
                name: 'StudentQuestions',
                component: () => import('@/views/student/Questions.vue')
            },
            {
                path: '/student/questions/:id',
                name: 'StudentQuestionDetail',
                component: () => import('@/views/student/QuestionDetail.vue')
            },
            {
                path: '/student/tags',
                name: 'StudentTags',
                component: () => import('@/views/student/Tags.vue')
            }
        ]
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    const userRole = store.getters['auth/userRole'];

    const requiresAdmin = to.matched.some(record => record.meta.adminOnly);

    if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
        if (userRole === 'admin') {
            return next('/admin');
        } else if (userRole === 'student') {
            return next('student');
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        return next('/student');
    }

    if (requiresAdmin && userRole !== 'admin') {
        return next('/student');
    }

    next();
});

router.afterEach((to) => {
    if (to.meta.authForm) {
        // Đảm bảo CSS được áp dụng sau khi chuyển trang
        setTimeout(() => {
            const forms = document.querySelectorAll('.register');
            forms.forEach(form => {
            if (form) {
                form.style.display = 'flex';
                form.style.flexDirection = 'column';
                form.style.backgroundColor = '#fff';
                form.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                form.style.width = 'fit-content';
                form.style.gap = '3em';
                form.style.margin = '4.5em auto';
                form.style.padding = '2.5em 4em';
                form.style.borderRadius = '2em';
            }
            });
        }, 0);
    }
});

export default router;