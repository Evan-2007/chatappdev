'use client'
import Input from '../input/page.jsx'
import style from './layout.module.css'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin');
    return null;
  }

  return (
    <>
      <div className={style.content}>
        <main>{children}</main>
        <Input className={style.input}/>
      </div>
    </>
  );
}
