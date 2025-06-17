'use client';
import { useParams } from 'next/navigation';
import React from 'react'

const ClassroomPage = () => {
    const params = useParams();
    const classId = params.classId;
    return (
        <div>Welcome to Class: {classId}</div>
    )
}

export default ClassroomPage