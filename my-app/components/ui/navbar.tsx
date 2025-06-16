"use client"
import { useState } from 'react'
import {
  Flex,
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'


export const Navbar = () => {
  const [display, changeDisplay] = useState('none')
  return (
    <Flex>
      <Flex
        position="fixed"
        top="1rem"
        right="1rem"
        align="center"
      >
        {/* Desktop */}
        <Flex
          display={['none', 'none', 'flex','flex']}
        >
          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Home
                    </Button>
          </NextLink>

          <NextLink href="/about" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="About"
              my={5}
              w="100%"
            >
              About
                    </Button>
          </NextLink>

          <NextLink href="/contact" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Contact"
              my={5}
              w="100%"
            >
              Contact
                    </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}