# Vellastra 星垂野内容系统 — 大前端 Monorepo

> **Vellastra Content System** — 基于 Vue 3 + TypeScript + Element Plus 构建的全平台内容系统前端，采用 pnpm monorepo 架构，一套代码覆盖 Web / Desktop / Mobile 三端。

**Vellastra** = *vellus*（覆盖万物的毯子）+ *astra*（群星），取"星辰如毡毯覆盖原野"之意，对应杜甫《旅夜书怀》"星垂平野阔，月涌大江流"的意境。

---

## 📦 项目架构

```
vellastra-fz/
├── packages/                          # 共享包
│   ├── api-core/                      #   API 请求客户端 + 模块工厂
│   ├── shared/                        #   共享类型 / 常量 / 工具函数
│   └── ui/                            #   共享 UI 组件 + 紫色星辰主题样式
│
├── apps/
│   ├── web/
│   │   ├── personal/                  # 📱 博客前台（用户端）
│   │   ├── admin/                     # 📊 管理后台（管理员端）
│   │   └── server-admin/              # 🖥️ 服务器管理后台
│   ├── desktop/                       # 💻 Electron 桌面应用
│   └── mobile/                        # 📱 跨平台移动端（Capacitor）
│
├── pnpm-workspace.yaml                # 工作空间配置
├── tsconfig.base.json                 # 共享 TypeScript 配置
└── package.json                       # 根脚本
```

---

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
| **ECharts** | 数据可视化图表 |
| **pnpm** | 包管理器（workspace） |
| **Electron** | 桌面应用框架 |
| **Capacitor** | 跨平台移动端框架 |

---

## 🚀 快速开始

### 前置依赖

- **Node.js** >= 18
- **pnpm** >= 8（安装：`npm install -g pnpm`）

### 安装依赖

```bash
# 安装所有 workspace 项目的依赖
pnpm install
```

### 启动开发服务器

```bash
# 博客前台（默认 http://localhost:5173）
pnpm dev

# 管理后台（默认 http://localhost:5174）
pnpm dev:admin

# 服务器管理（默认 http://localhost:5175）
pnpm dev:server-admin

# 桌面应用（Electron）
pnpm dev:desktop

# 移动端
pnpm dev:mobile
```

### 构建生产版本

```bash
# 构建博客前台
pnpm build

# 构建管理后台
pnpm build:admin

# 构建服务器管理
pnpm build:server-admin

# 构建所有 Web 应用
pnpm build:all

# 构建桌面应用
pnpm build:desktop

# 构建移动端
pnpm build:mobile
```

---

## 📁 各应用详情

### 🏠 博客前台 (`apps/web/personal`)

面向普通用户的博客前端，支持文章浏览、搜索、评论互动、用户注册登录和个人内容管理。

**端口**: `5173`

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 文章列表，支持分类筛选和分页 |
| `/article/:id` | 文章详情 | 查看文章内容、评论互动、点赞 |
| `/login` | 登录 | 用户登录 |
| `/register` | 注册 | 新用户注册 |
| `/user/write` | 写文章 | 创建新文章 |
| `/user/write/:id` | 编辑文章 | 编辑已有文章 |
| `/user/articles` | 我的文章 | 管理自己的文章 |
| `/user/profile` | 个人中心 | 修改个人信息 |

### 📊 管理后台 (`apps/web/admin`)

面向管理员的综合管理后台，含仪表盘、内容管理、用户管理和系统设置。

**端口**: `5174`

| 路径 | 页面 | 说明 |
|------|------|------|
| `/login` | 管理员登录 | 管理员身份认证 |
| `/admin/dashboard` | 仪表盘 | 系统概览统计 |
| `/admin/article/list` | 文章管理 | 管理所有文章 |
| `/admin/article/edit/:id` | 编辑文章 | 后台编辑文章 |
| `/admin/category` | 分类管理 | 管理文章分类 |
| `/admin/tag` | 标签管理 | 管理文章标签 |
| `/admin/comment` | 评论管理 | 管理用户评论 |
| `/admin/user` | 用户管理 | 管理系统用户 |
| `/admin/setting` | 系统设置 | 系统参数配置 |

### 🖥️ 服务器管理 (`apps/web/server-admin`)

面向运维人员的服务器监控面板，实时查看 CPU / 内存 / 磁盘等运行状态。

**端口**: `5175`

### 💻 桌面应用 (`apps/desktop`)

基于 Electron 的桌面客户端，可打包为 Windows / macOS / Linux 原生应用。

```bash
# 开发模式
pnpm dev:desktop

# 构建安装包
cd apps/desktop
pnpm build:win    # Windows (.exe)
pnpm build:mac    # macOS (.dmg)
pnpm build:linux  # Linux (.AppImage)
```

### 📱 移动端 (`apps/mobile`)

基于 Capacitor 的跨平台移动应用，一套代码构建 Android 和 iOS 原生应用。

```bash
# 同步 Android 项目
pnpm --filter @vellastra/mobile android:sync

# 在 Android Studio 中打开
pnpm --filter @vellastra/mobile android:open

# 构建 Android 应用
pnpm --filter @vellastra/mobile android:build
```

---

## 📦 共享包说明

| 包名 | 路径 | 说明 |
|------|------|------|
| `@vellastra/shared` | `packages/shared/` | 共享类型定义、常量、日志工具 |
| `@vellastra/api-core` | `packages/api-core/` | Axios 请求客户端、API 模块工厂函数 |
| `@vellastra/ui` | `packages/ui/` | 通用 Vue 组件、紫色星辰主题 SCSS 变量 |

---

## 🔧 代理配置

各 Web 应用的 Vite 开发服务器均已配置代理，将请求转发到后端 Gateway：

| 路径前缀 | 代理目标 | 说明 |
|---------|---------|------|
| `/api/**` | `http://localhost:8080` | 业务接口（用户/文章/分类/评论等） |
| `/auth/**` | `http://localhost:8080` | 鉴权接口（登录/注册/登出） |

### 后端依赖

本项目需要配合 **Vellastra 内容系统后端** 使用，启动前端前请确保后端正常运行：

- ✅ Nacos（服务注册中心，端口 8848）
- ✅ MySQL（数据库，端口 3306）
- ✅ Gateway 网关（端口 8080）
- ✅ vellastra-auth 鉴权服务（端口 8081）
- ✅ vellastra-user 用户服务（端口 8082）
- ✅ vellastra-article 文章服务（端口 8083）
- ✅ vellastra-category 分类服务（端口 8084）
- ✅ vellastra-comment 评论服务（端口 8085）

---

## 🔐 鉴权说明

- **登录后**：服务端返回 JWT Token → 存储在 `localStorage` → 通过 `Authorization: Bearer <token>` 请求头发送
- **用户标识**：通过 `X-User-Id` 请求头传递当前登录用户 ID
- **鉴权接口**：使用 `authRequest` 实例（`/auth` 前缀）
- **业务接口**：使用 `request` 实例（`/api` 前缀）

---

## 💡 开发规范

- 组件命名：`PascalCase.vue`
- 变量命名：`camelCase`
- 路由命名：`kebab-case`
- API 方法命名：`getXxxApi` / `createXxxApi` / `updateXxxApi` / `deleteXxxApi`
- 样式：使用 Scoped SCSS，变量统一引用 `@vellastra/ui` 中的 `variables.scss`
- 包引用：使用 `workspace:*` 协议引用本地包

---

## 📄 许可证

[MIT](LICENSE)