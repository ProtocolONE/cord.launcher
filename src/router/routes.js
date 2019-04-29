import Layout from 'layouts/main'
import UserLayout from 'layouts/user'
import AuthLayout from 'layouts/auth'

import Login from 'pages/auth/login'
import Sign from 'pages/auth/sign'

import Home from 'pages/home'
import Shop from 'pages/shop'
import Library from 'pages/library'

import GamePreview from 'pages/game/preview'

import UserPersonal from 'pages/user/personal'
import UserAccount from 'pages/user/account'
import UserSecurity from 'pages/user/security'
import UserPayments from 'pages/user/payments'
import UserLauncher from 'pages/user/launcher'

import Error404 from 'pages/errors/404'

export const AUTH_ROUTES = [
  {
    name: 'login',
    path: '/auth/login',
    component: Login
  },
  {
    name: 'sign',
    path: '/auth/sign',
    component: Sign
  }
]

export const MAIN_ROUTES = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'shop',
    path: '/shop',
    component: Shop
  },
  {
    name: 'library',
    path: '/library',
    component: Library
  }
]

export const GAME_ROUTES = [
  {
    name: 'game-preview',
    path: '/game/:id',
    component: GamePreview
  }
]

export const USER_ROUTES = [
  {
    name: 'personal',
    path: '/user/personal',
    component: UserPersonal
  },
  {
    name: 'account',
    path: '/user/account',
    component: UserAccount
  },
  {
    name: 'security',
    path: '/user/security',
    component: UserSecurity
  },
  {
    name: 'payments',
    path: '/user/payments',
    component: UserPayments
  }
]

if (process.env.MODE === 'electron') {
  USER_ROUTES.push({
    name: 'launcher',
    path: '/user/launcher',
    component: UserLauncher
  })
}

export default [
  {
    path: '/',
    component: Layout,
    children: MAIN_ROUTES.concat(GAME_ROUTES)
  },
  {
    path: '/user',
    component: UserLayout,
    children: USER_ROUTES,
    redirect: USER_ROUTES[0].path
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: AUTH_ROUTES,
    redirect: AUTH_ROUTES[0].path
  },
  {
    name: 'error-404',
    path: '*',
    component: Error404
  }
]
