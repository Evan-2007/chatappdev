'use client'
import { Suspense } from 'react';
import Input from '../input/page.jsx'
import style from './layout.module.css'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
//import Loading from './loading.tsx'


export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin');
    return null;
  }

  return (

    //<Suspense fallback={<Loading />}> -->
        <div className={style.content}>

          <main>{children}</main>
          <Input className={style.input}/>
        </div>
     // </Suspense>

  );
}
