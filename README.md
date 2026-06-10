# 基于 Spring Boot 的全栈商城平台的设计与实现

> 新蜂商城（NewBee Mall）—— 一套基于 Spring Boot + Vue 3 的前后端分离电商系统

![Build Status](https://img.shields.io/badge/build-passing-green.svg)
![Version 3.0.0](https://img.shields.io/badge/version-3.0.0-yellow.svg)
[![License](https://img.shields.io/badge/license-GPL3.0-blue.svg)](https://github.com/newbee-ltd/newbee-mall-vue3-app/blob/master/LICENSE)

## 项目简介

本项目是一套完整的电商系统，采用**前后端分离**架构，包含以下三个子项目：

| 子项目                      | 说明        | 技术栈                                                |
| :----------------------- | :-------- | :------------------------------------------------- |
| **newbee-mall-api**      | 后端 API 服务 | Spring Boot 2.7.5, MyBatis, MySQL, Swagger, Lombok |
| **newbee-mall-vue3-app** | 移动端商城 H5  | Vue 3, Vite, Vant 4, Pinia, Vue Router 4, Axios    |
| **vue3-admin**           | 后台管理系统    | Vue 3, Vite, Element Plus, Vue Router 4, Axios     |

### 功能模块

**前台商城系统（newbee-mall-vue3-app）：**
首页门户、商品分类、新品上线、首页轮播、商品推荐、商品搜索、商品展示、购物车、订单结算、订单流程、个人订单管理、会员中心、地址管理

**后台管理系统（vue3-admin）：**
数据面板、轮播图管理、商品管理、商品分类管理、订单管理、会员管理、账户设置

## 项目结构

```
基于 Spring Boot 的全栈商城平台的设计与实现/
└── newbee-mall-project/          # 项目根目录
    ├── newbee-mall-api/          # 后端 API（Spring Boot）
    │   ├── src/main/java/        # Java 源码
    │   ├── src/main/resources/   # 配置文件 & MyBatis Mapper
    │   └── pom.xml
    ├── newbee-mall-vue3-app/     # 移动端商城前端（Vue 3 + Vant）
    │   ├── src/
    │   └── package.json
    └── vue3-admin/               # 后台管理前端（Vue 3 + Element Plus）
        ├── src/
        └── package.json
```

## 技术栈

### 后端

- **Java 17**
- **Spring Boot 2.7.5**
- **MyBatis** — ORM 持久层框架
- **MySQL** — 关系型数据库
- **SpringFox (Swagger) 3.0** — API 文档
- **Lombok** — 简化 Java 代码
- **Maven** — 项目构建

### 前端（移动端 H5）

- **Vue 3** — 渐进式 JavaScript 框架
- **Vite 4** — 前端构建工具
- **Vant 4** — 移动端组件库
- **Pinia** — 全局状态管理
- **Vue Router 4** — 路由管理
- **Axios** — HTTP 请求
- **better-scroll** — 滚动加载
- **Less** — CSS 预处理
- **postcss-pxtorem** — 移动端适配

### 前端（后台管理）

- **Vue 3** + **Vite 2**
- **Element Plus** — 后台管理 UI 组件库
- **Vue Router 4** — 路由管理
- **Axios** — HTTP 请求
- **WangEditor** — 富文本编辑器
- **Sass** — CSS 预处理

## 环境要求

| 工具         | 版本         |
| :--------- | :--------- |
| JDK        | 17+        |
| Maven      | 3.6+       |
| MySQL      | 5.7+ / 8.0 |
| Node.js    | 16+        |
| npm / yarn | 8+ / 1.22+ |

## 快速启动

### 1. 后端 API 服务

```bash
# 进入后端项目目录
cd newbee-mall-project/newbee-mall-api

# 配置数据库
# 修改 src/main/resources/application.properties 中的 MySQL 连接信息
# 导入项目提供的 SQL 初始化脚本

# 编译并启动
mvn clean package -DskipTests
java -jar target/newbee-mall-api-3.0.0-SNAPSHOT.jar

# 或使用 Maven 直接启动
mvn spring-boot:run
```

后端默认启动地址：`http://localhost:28089`
Swagger API 文档：`http://localhost:28089/swagger-ui/`

### 2. 移动端商城前端

```bash
# 进入前端项目目录
cd newbee-mall-project/newbee-mall-vue3-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 3. 后台管理前端

```bash
# 进入前端项目目录
cd newbee-mall-project/vue3-admin

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build:release
```

## 线上预览

| 项目    | 预览地址                           | 说明                         |
| :---- | :----------------------------- | :------------------------- |
| 移动端商城 | <118.31.42.128>   | 账号可自行注册，建议手机模式访问           |
| 后台管理  | (http://118.31.42.128/admin/) | 测试账号：`admin` / 密码：`123456` |

## 页面展示

### 移动端商城

|                               首页                               |                                商品搜索                                |                                购物车                               |
| :------------------------------------------------------------: | :----------------------------------------------------------------: | :--------------------------------------------------------------: |
| ![首页](newbee-mall-project/newbee-mall-api/static-files/首页.png) | ![商品搜索](newbee-mall-project/newbee-mall-api/static-files/商品搜索.png) | ![购物车](newbee-mall-project/newbee-mall-api/static-files/购物车.png) |

|                               商品详情                               |                                生成订单                                |                                订单列表                                |
| :--------------------------------------------------------------: | :----------------------------------------------------------------: | :----------------------------------------------------------------: |
| ![详情页](newbee-mall-project/newbee-mall-api/static-files/详情页.png) | ![生成订单](newbee-mall-project/newbee-mall-api/static-files/生成订单.png) | ![订单列表](newbee-mall-project/newbee-mall-api/static-files/订单列表.png) |

