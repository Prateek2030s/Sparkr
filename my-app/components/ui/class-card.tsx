"use client"
import { Button, Card, Image, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

interface ClassObject {
    className: string
    classDescription: string
    classId: number
    role: string
}

interface ClassCardProps {
    classItem: ClassObject
}

const ClassCard = ({classItem}: ClassCardProps) => {
    const router = useRouter()
    return (
        <Card.Root maxW="sm" overflow="hidden">
        <Image
            src="https://plus.unsplash.com/premium_photo-1672256330854-98c717493128?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Class Image"
        />
        <Card.Body gap="2">
            <Card.Title>{classItem.className}</Card.Title>
            <Card.Description>
            {classItem.classDescription}
            </Card.Description>

        </Card.Body>
        <Card.Footer gap="2">
            <Button variant="surface" onClick={() => router.push(`classroom/${classItem.classId}?name=${classItem.className}`)}> Enter class </Button>
            {classItem.role == "teacher" && <Button variant="ghost">View Settings</Button>}
        </Card.Footer>
        </Card.Root>
  )
}

export default ClassCard