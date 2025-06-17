import React from 'react'
import { Navbar } from '../../components/ui/navbar'
import { VStack, Box } from "@chakra-ui/react"

const DashboardLayout = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <>
        <Navbar />
        <Box p={6}>
          { children }
        </Box>
    </>
  )
}

export default DashboardLayout