'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { X } from 'lucide-react';
import Spinner from '../(spinner)/Spinner';

const ButtonAuth = () => {
    const { data, status } = useSession();

    return (
        <div className='flex items-center gap-2'>
            {status == 'authenticated' && (
                <Link
                    href='/dashboard'
                    className='px-2 text-xs md:text-sm  py-2 btn-primary'
                >
                    Meu Painel
                </Link>
            )}

            {status == 'loading' && <Spinner />}

            {status === 'unauthenticated' && (
                <button
                    onClick={() => signIn('google')}
                    className='px-2  text-xs md:text-sm  py-2 btn-primary'
                >
                    Entrar
                </button>
            )}

            {status == 'authenticated' && (
                <button
                    onClick={() => signOut()}
                    className='px-2  text-xs md:text-sm  py-2 btn-primary flex items-center  gap-2'
                >
                    <p className='text-xs md:text-sm '> {data?.user?.name}</p>
                    <X size={16} className='text-zinc-400' />
                </button>
            )}
        </div>
    );
};

export default ButtonAuth;
