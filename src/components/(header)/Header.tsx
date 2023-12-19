'use client';

import Link from 'next/link';
import ButtonAuth from './ButtonAuth';

const Header = () => {
    return (
        <header className='flex items-center justify-between border-b border-zinc-600 w-full max-w-[1200px] mx-auto py-4 '>
            <Link href='/'>
                <h1 className='text-3xl font-medium '>Tasks</h1>
            </Link>

            <ButtonAuth />
        </header>
    );
};

export default Header;
