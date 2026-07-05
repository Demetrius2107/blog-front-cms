import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/modules/user'

NProgress.configure({ showSpinner: false })

const routes = [
  // ============ 博客前台 ============
  {
    path: '/',
    component: () => import('@/layouts/BlogLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/blog/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/blog/ArticleDetail.vue'),
        meta: { title: '文章详情' }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: { title: '登录', hidden: true }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/blog/Register.vue'),
        meta: { title: '注册', hidden: true }
      },
      // 用户中心（需登录）
      {
        path: 'user/write',
        name: 'WriteArticle',
        component: () => import('@/views/user/WriteArticle.vue'),
        meta: { title: '写文章', requiresAuth: true }
      },
      {
        path: 'user/write/:id',
        name: 'EditArticle',
        component: () => import('@/views/user/WriteArticle.vue'),
        meta: { title: '编辑文章', requiresAuth: true }
      },
      {
        path: 'user/articles',
        name: 'MyArticles',
        component: () => import('@/views/user/MyArticles.vue'),
        meta: { title: '我的文章', requiresAuth: true }
      },
      {
        path: 'user/profile',
        name: 'Profile',
        component: () => import('@/views/user/Profile.vue'),
        meta: { title: '个人中心', requiresAuth: true }
      }
    ]
  },

  // ============ 后台管理 ============
  {
    path: '/admin',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'Odometer' }
      },
      {
        path: 'article',
        name: 'AdminArticle',
        component: () => import('@/views/article/index.vue'),
        meta: { title: '文章管理', icon: 'Document' },
        redirect: '/admin/article/list',
        children: [
          {
            path: 'list',
            name: 'AdminArticleList',
            component: () => import('@/views/article/list.vue'),
            meta: { title: '文章列表', icon: 'Tickets' }
          },
          {
            path: 'edit/:id?',
            name: 'AdminArticleEdit',
            component: () => import('@/views/article/edit.vue'),
            meta: { title: '编辑文章', icon: 'EditPen', hidden: true }
          }
        ]
      },
      {
        path: 'category',
        name: 'AdminCategory',
        component: () => import('@/views/category/index.vue'),
        meta: { title: '分类管理', icon: 'Menu' }
      },
      {
        path: 'tag',
        name: 'AdminTag',
        component: () => import('@/views/tag/index.vue'),
        meta: { title: '标签管理', icon: 'PriceTag' }
      },
      {
        path: 'comment',
        name: 'AdminComment',
        component: () => import('@/views/comment/index.vue'),
        meta: { title: '评论管理', icon: 'ChatDotRound' }
      },
      {
        path: 'user',
        name: 'AdminUser',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'setting',
        name: 'AdminSetting',
        component: () => import('@/views/setting/index.vue'),
        meta: { title: '系统设置', icon: 'Setting' }
      }
    ]
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404', hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const authWhiteList = ['/login', '/register']

router.beforeEach((to, _from, next) => {
  NProgress.start()
  document.title = `${to.meta.title || ''} - MyBlog`

  const userStore = useUserStore()

  // 需要登录但未登录 → 跳转登录
  if (to.meta.requiresAuth && !userStore.token) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // 需要管理员权限但角色不是 admin → 跳首页
  if (to.meta.requiresAdmin && userStore.userInfo?.role !== 'admin') {
    return next({ path: '/' })
  }

  // 已登录访问登录/注册页 → 跳首页
  if (userStore.token && authWhiteList.includes(to.path)) {
    return next({ path: '/' })
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
