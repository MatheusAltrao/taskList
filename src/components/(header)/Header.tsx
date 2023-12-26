//se der erro coloque o use client
import Link from 'next/link';
import ButtonAuth from './ButtonAuth';

const Header = () => {
    return (
        <header className='flex items-center justify-between border-b border-zinc-600 w-full max-w-[900px] mx-auto py-4 '>
            <Link href='/'>
                <h1 className=' text-xl sm:text-3xl font-medium '>Tasks</h1>
            </Link>

            <ButtonAuth />
        </header>
    );
};

export default Header;
