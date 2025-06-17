// components/ui/provider.tsx
'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

import { PropsWithChildren } from 'react';

export function Provider(props: PropsWithChildren<object>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}