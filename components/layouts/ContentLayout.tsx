const WIDTH_CLASSES = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-7xl',
} as const

interface ContentLayoutProps {
  children: React.ReactNode
  width?: keyof typeof WIDTH_CLASSES
}

export function ContentLayout({
  children,
  width = 'default',
}: ContentLayoutProps) {
  return (
    <div className={`mx-auto w-full ${WIDTH_CLASSES[width]}`}>
      {children}
    </div>
  )
}
