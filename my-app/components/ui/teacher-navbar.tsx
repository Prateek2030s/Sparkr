"use client"
import {
  Box,
  Button,
  HStack, 
  Icon,
  Text
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { HiAcademicCap } from "react-icons/hi2";


export const Navbar = () => {
  const router = useRouter()

  return (
    <div className="w-full h-16 bg-slate-800 flex items-center justify-center shadow-md">
  <div className="w-[95%] flex items-center justify-between">
    <Box
      textStyle="xl"
      fontWeight="semibold"
      letterSpacing="wider"
      font="Helvetica"
    >
      <HStack>
        <Icon size="xl">
          <HiAcademicCap />
        </Icon>
        <Text fontSize="xl">
          Sparkr
        </Text>
      </HStack>
    </Box>
    
    {/* Centered navigation buttons */}
    <div className="flex items-center gap-5 bg-slate-700/50 rounded-lg p-1">
      <Button 
        onClick={() => router.push("/dashboard")} 
        colorPalette="blue" 
        variant="ghost" 
        size="md" 
        rounded="md"
        className="px-4"
      >
        Dashboard
      </Button>
      <Button 
        onClick={() => router.push("/quiz")} 
        colorPalette="blue" 
        variant="ghost" 
        size="md" 
        rounded="md"
        className="px-4"
      >
        Quizzes
      </Button>
      <Button 
        onClick={() => router.push("/live")} 
        colorPalette="blue" 
        variant="ghost" 
        size="md" 
        rounded="md"
        className="px-4"
      >
        Live Class
      </Button>
    </div>
    
    <Button 
      onClick={() => router.push("/logout")} 
      colorPalette="red" 
      variant="ghost" 
      size="md" 
      rounded="lg"
    >
      Logout
    </Button>
  </div>
</div>
  )
}