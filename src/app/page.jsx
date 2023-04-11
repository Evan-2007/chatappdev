'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Hi = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.push('/messages')
  }, [])

  return <div>Redirecting...</div>;
};

export default Hi;
