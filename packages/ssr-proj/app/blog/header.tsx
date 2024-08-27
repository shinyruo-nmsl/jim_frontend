'use client'
import Image from 'next/image';
import Link from 'next/link';

import HOME_SVG from '@/app/assets/home.svg';
import LOGO_PNG from '@/app/assets/logo.png';


export default function Header() {
    return (
        <header className="flex items-center justify-between p-20  md:p-10 md:bg-azure">
            <div className="flex items-center gap-4">
                <Image src={LOGO_PNG} alt="Logo" width={40} height={40} />
                <h1 className="text-xl font-bold">My Blog</h1>
            </div>
            <Link href="/blog">
                <Image src={HOME_SVG} alt="Home" width={24} height={24} />
            </Link>

        </header>
    );
}