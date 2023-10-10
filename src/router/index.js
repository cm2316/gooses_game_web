import { useLocation, useRoutes } from 'react-router-dom'
import React, { Suspense } from 'react'
import KeepAlive from 'react-activation'
import Layout from '@/components/common/RouterLayout/base/Base'
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback'

const Home = React.lazy(() => import('@/pages/home/Index'))
const Apps = React.lazy(() => import('@/pages/apps/Index'))
const Category = React.lazy(() => import('@/pages/apps/ByTopicApps'))
const PlayGround = React.lazy(() => import('@/pages/play-ground/Index'))

export const routes = [
  {
    path: '/',
    component: Layout,
    keepAlive: false,
    children: [
      {
        index: true,
        keepAlive: true,
        component: Home,
      },
      {
        path: 'hot-apps',
        keepAlive: true,
        component: Apps,
      },
      {
        path: 'new-apps',
        keepAlive: true,
        component: Apps,
      },
      {
        path: 'category',
        keepAlive: true,
        component: Category,
      },
    ],
  },
  {
    path: 'play/:id/:name',
    keepAlive: true,
    component: PlayGround,
  },
]

const checkAuth = (routes, path) => {
  for (const route of routes) {
    if (route.path === path) return route
    if (route.children) {
      const childRoute = checkAuth(route.checkAuth, path)
      if (childRoute) {
        return childRoute
      }
    }
  }
}

const WrapSuspense = ({ children, ...props }) => {
  return <Suspense {...props}>{children}</Suspense>
}

const WrapKeepAlive = ({ children, ...props }) => {
  const { pathname, search } = useLocation()
  const cacheKey = `${pathname}/${search}`
  return (
    <KeepAlive cacheKey={cacheKey} saveScrollPosition {...props}>
      {children}
    </KeepAlive>
  )
}

const generateRouter = (routes) => {
  return routes.map((route) => {
    const { component: Component, path, index, keepAlive, children, ...props } = route
    let Comp = <Component />
    const _route = { path, index }
    if (children) {
      _route.children = generateRouter(children)
    }
    if (keepAlive) {
      Comp = (
        <WrapKeepAlive id={path} {...props}>
          {Comp}
        </WrapKeepAlive>
      )
    }
    if (route.component.$$typeof === Symbol.for('react.lazy')) {
      Comp = <WrapSuspense {...props}>{Comp}</WrapSuspense>
    }
    _route.element = <ErrorFallback>{Comp}</ErrorFallback>
    return _route
  })
}

const Router = () => useRoutes(generateRouter(routes))

const checkRouterAuth = (path) => {
  return checkAuth(routes, path) || null
}

export { Router, checkRouterAuth }
