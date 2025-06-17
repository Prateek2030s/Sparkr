import React from 'react'
import ClassCard from '../../../components/ui/class-card'
import { Center, For, HStack, Box, VStack, Button } from "@chakra-ui/react"

const TeacherDashboard = () => {
  const classes = [
    {className: "Linear Algebra I", classDescription: "This is the introductory course to linear algebra and its applications", classId: 123456},
    {className: "Calculus II", classDescription: "This is the introductory course to calculus and its applications", classId: 234567},
    {className: "Statistics and Probability", classDescription: "This is the introductory course to statistics and probability and its applications", classId: 345678}
  ]

  return (
    <Center>
        <VStack>
            <Box p = {6}>
                <HStack>
                    <For
                    each={classes}
                    >
                    {(item) => (
                        <ClassCard classItem={item} key={item.classId}/>
                    )}
                    </For>
                </HStack>
            </Box>

            <Box p={6}>
                <Button>
                    Join New Class
                </Button>
            </Box>
        </VStack>
    </Center>
  )
}

export default TeacherDashboard