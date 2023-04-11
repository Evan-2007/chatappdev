'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

import style from './test.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";


export default function CamperVanPage() {
    const { data: session, status } = useSession()

    if (status === "loading") { 
        return (
            <div className={style.loaderdiv}> 
                <span class={style.loader}> 
                    <span></span> 
                    <span></span> 
                </span> 
            </div>
        ) 
    }

    if (status === 'unauthenticated') {
        return (
            <div className={style.content}>
                <ul className={style.list}>
                    <li className={style.row1}>
                        <FontAwesomeIcon icon={faUserCircle} className={style.icon} />
                        <p>Not Logged In</p>
                    </li>
                    <div className={style.line}></div>
                    <li className={style.row2}>
                        <Link href="/">
                            <p>Home</p>
                        </Link>
                    </li>
                    <div className={style.line}></div>
                    <li className={style.row3}>
                        <Link href="/api/auth/signin">
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <div className={style.line}></div>
                    <li className={style.row4}>
                        <Link href="/api/auth/signin">
                            <p>Users</p>
                        </Link>
                    </li>
                    <div className={style.line}></div>
                    <li className={style.row5}>
                        <Link href="/api/auth/signin">
                            <p>Settings</p>
                        </Link>
                    </li>
                    <div className={style.line}></div>
                    <li className={style.row4}>
                        <Link href="/api/auth/signin">
                            <p>Sign In/Sign Up</p>
                        </Link>
                    </li>
                    <div className={style.line}></div>
                </ul>
            </div>
        );
    }
    return (
        <div className={style.content}>
            <ul className={style.list}>
                <li className={style.row1}>
                    <img src={session.user.image} alt="icon" className={style.icon} />
                    <p>{session.user.name}</p>
                </li>
                <div className={style.line}></div>
                <li className={style.row2}>
                    <Link href="/">
                        <p>Home</p>
                    </Link>
                </li>
                <div className={style.line}></div>
                <li className={style.row3}>
                    <Link href="/dashboard">
                        <p>Dashboard</p>
                    </Link>
                </li>
                <div className={style.line}></div>
                <li className={style.row4}>
                    <Link href="/users">
                        <p>Users</p>
                    </Link>
                </li>
                <div className={style.line}></div>
                <li className={style.row5}>
                    <Link href="/user/settings">
                        <p>Settings</p>
                    </Link>
                </li>
                <div className={style.line}></div>
                <li className={style.row4}>
                    <Link href="/api/auth/signout">
                        <p>Sign Out</p>
                    </Link>
                </li>
                <div className={style.line}></div>
            </ul>
        </div>


    );
}