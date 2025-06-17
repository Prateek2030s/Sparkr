'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AbsoluteCenter, Card, Heading } from "@chakra-ui/react"

export default function UnauthorisedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
    }, 5000); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AbsoluteCenter>
      <Card.Root size="lg" bg="red.500">
        <Card.Header>
          <Heading size="lg"> UNAUTHORISED ACCESS </Heading>
        </Card.Header>
        <Card.Body color="white">
          You are being redirected to your previous page...
        </Card.Body>
      </Card.Root>
    </AbsoluteCenter>
  );
}