import Image from 'next/image';
import HeroImage from '../assets/heroImage.svg';

import Counting from '@/components/(couting)/Counting';

export default function Home() {
    return (
        <div className=' mt-32 w-full max-w-[900px] mx-auto flex items-center justify-center flex-col gap-8 '>
            <div className=' pr-8 '>
                <Image
                    src={HeroImage}
                    alt=''
                    height={400}
                    width={400}
                    priority={true}
                    className='w-full max-w-[400px] max-h-[400px]'
                />
            </div>

            <div className='flex flex-col items-center justify-center gap-4 w-full text-center'>
                <h1 className='text-2xl font-semibold text-center max-w-[300px]'>
                    Sistema feito para você organizar seus estudos e terefas
                </h1>
            </div>

            <Counting />
        </div>
    );
}
