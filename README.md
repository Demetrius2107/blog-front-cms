# MyBlog 博客前端

> **Blog-Front-MS** — 基于 Vue 3 + TypeScript + Element Plus 构建的博客前端项目，支持博客前台浏览与后台管理双模式。

---

## 📋 项目概览

本项目是一个面向用户的博客前端系统，采用 **博客前台 + 后台管理** 的双布局架构：

- 🏠 **博客前台** (`/`) — 首页文章列表、文章详情、评论互动、用户注册/登录
- 👤 **用户中心** (`/user/*`) — 写文章、我的文章、个人资料管理
- 🔧 **后台管理** (`/admin/*`) — 仪表盘、文章管理、分类管理、标签管理、评论管理、用户管理、系统设置

## 🏗 技术栈

| 技术 | 说明 |
|------|------|
| **Vue 3** | 渐进式 JavaScript 框架（Composition API） |
| **TypeScript** | 类型安全的 JavaScript 超集 |
| **Vite** | 前端构建工具 |
| **Element Plus** | 基于 Vue 3 的 UI 组件库 |
| **Pinia** | Vue 3 状态管理（带持久化插件） |
| **Vue Router** | 路由管理 |
| **Axios** | HTTP 请求库 |
| **Sass** | CSS 预处理器 |
| **Day.js** | 日期处理 |
| **NProgress** | 页面加载进度条 |

## 📁 项目结构

```
blog-front-ms/
├── public/                        # 静态资源（favicon 等）
│   └── vite.svg
├── src/
│   ├── api/                       # API 接口层
│   │   ├── article.ts             #   文章相关接口
│   │   ├── auth.ts                #   鉴权相关接口（登录/注册/登出）
│   │   ├── category.ts            #   分类相关接口
│   │   ├── comment.ts             #   评论相关接口
│   │   ├── tag.ts                 #   标签相关接口
│   │   ├── user.ts                #   用户相关接口
│   │   └── setting.ts             #   系统设置接口
│   ├── assets/                    # 静态资源
│   │   └── logo.svg
│   ├── layouts/                   # 布局组件
│   │   ├── BlogLayout.vue         #   博客前台布局（顶部导航 + 分类 + 页脚）
│   │   ├── MainLayout.vue         #   后台管理布局（侧边栏 + 导航栏）
│   │   └── components/
│   │       ├── Navbar.vue         #     顶部导航栏
│   │       └── Sidebar.vue        #     侧边栏菜单
│   ├── router/
│   │   └── index.ts               # 路由配置（博客前台 / 用户中心 / 后台管理）
│   ├── store/
│   │   └── modules/
│   │       ├── user.ts            # 用户状态（token、userInfo、userId）
│   │       └── app.ts             # 应用状态（侧边栏折叠、设备类型）
│   ├── styles/
│   │   ├── variables.scss         # SCSS 变量（颜色、尺寸等）
│   │   └── index.scss             # 全局样式
│   ├── utils/
│   │   ├── request.ts             # Axios 实例（/api 前缀、拦截器）
│   │   └── authRequest.ts         # Axios 实例（/auth 前缀，用于鉴权）
│   ├── views/
│   │   ├── blog/                  # 博客前台页面
│   │   │   ├── Home.vue           #   首页（文章列表 + 分类筛选 + 分页）
│   │   │   ├── ArticleDetail.vue  #   文章详情（内容 + 评论 + 点赞）
│   │   │   └── Register.vue       #   用户注册
│   │   ├── user/                  # 用户中心页面
│   │   │   ├── WriteArticle.vue   #   写文章 / 编辑文章
│   │   │   ├── MyArticles.vue     #   我的文章列表
│   │   │   └── Profile.vue        #   个人信息设置
│   │   ├── login/                 # 登录页面
│   │   ├── dashboard/             # 后台仪表盘
│   │   ├── article/               # 后台文章管理
│   │   ├── category/              # 后台分类管理
│   │   ├── tag/                   # 后台标签管理
│   │   ├── comment/               # 后台评论管理
│   │   ├── user/                  # 后台用户管理
│   │   ├── setting/               # 后台系统设置
│   │   └── error/
│   │       └── 404.vue            # 404 页面
│   ├── App.vue                    # 根组件
│   ├── main.ts                    # 应用入口
│   ├── env.d.ts                   # 类型声明
│   ├── auto-imports.d.ts          # 自动导入声明
│   └── components.d.ts            # 组件自动注册声明
├── index.html                     # HTML 入口
├── vite.config.ts                 # Vite 配置
├── tsconfig.json                  # TypeScript 配置
├── package.json                   # 项目依赖
└── .gitignore                     # Git 忽略规则
```

## 🚀 快速开始

### 前置依赖

- **Node.js** >= 18
- **npm** >= 9

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 3. 构建生产版本
npm run build

# 4. 预览构建结果
npm run preview
```

### 后端依赖

本项目需要配合 **[Blog-BackEnd-MS](https://github.com/your-repo/Blog-BackEnd-MS)** 后端使用，启动前端前请确保后端已启动：

- ✅ Nacos（服务注册中心，端口 8848）
- ✅ MySQL（数据库，端口 3306）
- ✅ Gateway 网关（端口 8080）
- ✅ blog-auth 鉴权服务（端口 8081）
- ✅ blog-user 用户服务（端口 8082）
- ✅ blog-article 文章服务（端口 8083）
- ✅ blog-category 分类服务（端口 8084）
- ✅ blog-comment 评论服务（端口 8085）

> Vite 开发服务器已配置 `/api` 和 `/auth` 代理转发到 `localhost:8080`（Gateway）。

## 🧭 路由导航

### 公开路由（无需登录）

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 文章列表，支持分类筛选和分页 |
| `/article/:id` | 文章详情 | 查看文章内容、评论互动、点赞 |
| `/login` | 登录 | 用户登录 |
| `/register` | 注册 | 新用户注册 |

### 用户路由（需登录）

| 路径 | 页面 | 说明 |
|------|------|------|
| `/user/write` | 写文章 | 创建新文章 |
| `/user/write/:id` | 编辑文章 | 编辑已有文章 |
| `/user/articles` | 我的文章 | 管理自己的文章（编辑/发布/删除） |
| `/user/profile` | 个人中心 | 修改个人信息 |

### 管理路由（需管理员角色）

| 路径 | 页面 | 说明 |
|------|------|------|
| `/admin/dashboard` | 仪表盘 | 系统概览统计 |
| `/admin/article/list` | 文章管理 | 管理所有文章 |
| `/admin/article/edit/:id` | 编辑文章 | 后台编辑文章 |
| `/admin/category` | 分类管理 | 管理文章分类 |
| `/admin/tag` | 标签管理 | 管理文章标签 |
| `/admin/comment` | 评论管理 | 管理用户评论 |
| `/admin/user` | 用户管理 | 管理系统用户 |
| `/admin/setting` | 系统设置 | 系统参数配置 |

## 🔧 代理配置

前端通过 Vite 代理将对后端的请求转发到 Gateway：

| 路径前缀 | 代理目标 | 说明 |
|---------|---------|------|
| `/api/**` | `http://localhost:8080` | 业务接口（用户/文章/分类/评论等） |
| `/auth/**` | `http://localhost:8080` | 鉴权接口（登录/注册/登出） |

Gateway 在 Nacos 注册中心发现各微服务实例并转发请求。

## 🔐 鉴权说明

- **登录后**：服务端返回 JWT Token → 存储在 `localStorage` → 通过 `Authorization: Bearer <token>` 请求头发送
- **用户标识**：通过 `X-User-Id` 请求头传递当前登录用户 ID（用于创建文章/评论/点赞等操作）
- **鉴权接口**：使用独立的 `authRequest.ts` 实例（`/auth` 前缀）
- **业务接口**：使用 `request.ts` 实例（`/api` 前缀）

## 💡 开发规范

- 组件命名：`PascalCase.vue`
- 变量命名：`camelCase`
- 路由命名：`kebab-case`
- API 方法命名：`getXxxApi` / `createXxxApi` / `updateXxxApi` / `deleteXxxApi`
- 样式：使用 Scoped SCSS，变量统一引用 `variables.scss`

## 📄 许可证

[MIT](LICENSE)
