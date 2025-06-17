// components/ui/color-mode.ts
'use client'

import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider, ThemeProviderProps, useTheme } from 'next-themes'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function ColorModeProvider({ children, ...props }: ThemeProviderProps & { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      disableTransitionOnChange 
      // Force a default theme for SSR to match client-side initial render
      defaultTheme="dark" // or "light" / "dark" if you prefer
      {...props}
    >
      {children}
    </ThemeProvider>
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof IconButton>>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      <ClientOnly fallback={<Skeleton boxSize='8' />}>
        <IconButton
          ref={ref}
          onClick={toggleColorMode}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5',
            },
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    )
  }
)

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme light"
      colorPalette="gray"
      colorScheme="light"
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      colorPalette="gray"
      colorScheme="dark"
      ref={ref}
      {...props}
    />
  )
})