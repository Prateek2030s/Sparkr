import React from 'react'
import { Navbar } from '../../../../components/ui/teacher-navbar'
import { VStack, Box } from "@chakra-ui/react"

const ClassroomLayout = (props: { children: React.ReactNode }) => {
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

export default ClassroomLayout