import { createElement, type ReactNode } from 'react'
import { ChromeLayout } from './ChromeLayout'
import { ContentLayout } from './ContentLayout'

interface AppLayoutProps {
  children: ReactNode
}

export { ChromeLayout, ContentLayout }

export function AppLayout({ children }: AppLayoutProps) {
  return createElement(
    ChromeLayout,
    null,
    createElement(ContentLayout, null, children)
  )
}
