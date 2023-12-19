import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const ButtonAuth = () => {
    const { data, status } = useSession();

    return (
        <div className='flex items-center gap-2'>
            {status == 'authenticated' && (
                <Link
                    href='/Dashboard'
                    className='px-6 text-sm  py-2 btn-primary'
                >
                    Meu Painel
                </Link>
            )}

            {status === 'unauthenticated' && (
                <button
                    onClick={() => signIn('google')}
                    className='px-6 text-sm  py-2 btn-primary'
                >
                    Entrar
                </button>
            )}

            {status == 'authenticated' && (
                <button
                    onClick={() => signOut()}
                    className='px-6  text-sm py-2 btn-primary'
                >
                    Sair
                </button>
            )}

            {status == 'authenticated' && (
                <>
                    <div className='h-10 mx-4 w-px bg-zinc-600' />

                    <p className='text-sm'> {data?.user?.name}</p>
                </>
            )}
        </div>
    );
};

export default ButtonAuth;
