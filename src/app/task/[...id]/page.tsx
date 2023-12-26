'use client';

import { useSession } from 'next-auth/react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { redirect } from 'next/navigation';
import { db } from '@/services/firebaseConnection';
import { doc, collection, query, where, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Textarea from '@/app/dashboard/components/(form)/Textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Task {
    task: string; // Change the type accordingly
    isPublic: boolean;
    created: string; // Change the type accordingly
    userEmail: string; // Change the type accordingly
    userName: string; // Change the type accordingly
    taskId: string; // Change the type accordingly
}

export default function TaskList({ params }: Params) {
    const [task, setTask] = useState<Task>();

    const { data } = useSession();

    if (!data?.user) {
        redirect('/');
    }

    useEffect(() => {
        const id = params?.id;
        const docRef = doc(db, 'tasks', String(id));

        async function handleReadTask() {
            const snapshot = await getDoc(docRef);
            if (snapshot.data() === undefined) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                };
            }

            /*  if (!snapshot.data()?.isPublic) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                };
            } */

            const taskData = {
                task: snapshot.data()?.task,
                isPublic: snapshot.data()?.isPublic,
                created: snapshot.data()?.created,
                userEmail: snapshot.data()?.userEmail,
                userName: snapshot.data()?.userName,
                taskId: id,
            };

            setTask(taskData);
        }

        handleReadTask();
    }, [params?.id]);

    return (
        <div className='w-full max-w-[900px] mx-auto mt-10'>
            {task ? (
                <div className='mt-10'>
                    <header className='space-y-8'>
                        <Link
                            href={'/dashboard'}
                            className='flex items-center gap-2 hover:text-blue-400 transition-colors'
                        >
                            <ArrowLeft size={20} />
                            <p>Voltar</p>
                        </Link>
                        <div className='flex items-center justify-between'>
                            {task.isPublic ? (
                                <div className='h-6 w-16 flex items-center rounded  bg-blue-300 justify-center'>
                                    <p className='  text-blue-950  font-semibold text-xs'>
                                        Pública
                                    </p>
                                </div>
                            ) : (
                                <div className='h-6 w-16 flex items-center rounded  bg-red-300 justify-center'>
                                    <p className='  text-red-950  font-semibold text-xs'>
                                        Privada
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className='text-zinc-500'>{task.created}</p>
                            </div>
                        </div>
                    </header>

                    <Textarea readOnly label='' value={task.task} />

                    <div className='flex items-start justify-between mt-2'>
                        <div className='flex  flex-col  '>
                            <p className='text-sm text-zinc-500'>
                                {' '}
                                {task.userEmail}
                            </p>
                            <p className='text-sm text-zinc-500'>
                                {' '}
                                {task.userName}
                            </p>
                        </div>

                        <div>
                            <p className='text-sm text-zinc-500'>
                                {' '}
                                {task.taskId}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
