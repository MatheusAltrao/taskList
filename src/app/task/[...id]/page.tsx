'use client';

import { useSession } from 'next-auth/react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { redirect, useRouter } from 'next/navigation';

import {
    addDoc,
    collection,
    query,
    where,
    onSnapshot,
    doc,
    deleteDoc,
    getDoc,
} from 'firebase/firestore';

import { FormEvent, useEffect, useState } from 'react';
import Textarea from '@/app/dashboard/components/(form)/Textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/services/firebaseConnection';
import { format } from 'date-fns';
import Toast from '@/components/(toast)/Toast';
import Comment from '@/app/dashboard/components/(comment)/Comment';

interface TaskProps {
    task: string;
    isPublic: boolean;
    created: string;
    userEmail: string;
    userName: string;
    taskId: string;
}

interface CommentProps {
    id: string;
    comment: string;
    created: string;
    userEmail: string;
    userName: string;
    taskId: string;
}

export default function TaskList({ params }: { params: { id: string } }) {
    const [task, setTask] = useState<TaskProps>();
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState<CommentProps[]>([]);
    const [showToast, setShowToast] = useState(false);
    const { data } = useSession();
    const ulrId = params?.id;

    const router = useRouter();

    useEffect(() => {
        async function loadComments() {
            const q = query(
                collection(db, 'comments'),
                where('taskId', '==', ulrId),
            );

            onSnapshot(q, (snapshot) => {
                let allComments = [] as CommentProps[];

                snapshot.forEach((doc) => {
                    allComments.push({
                        id: doc.id,
                        created: doc.data().created,
                        comment: doc.data().comment,
                        userEmail: doc.data().userEmail,
                        userName: doc.data().userName,
                        taskId: doc.data().ulrId,
                    });
                });

                setAllComments(allComments);
            });
        }

        loadComments();
    }, [ulrId]);

    useEffect(() => {
        const docRef = doc(db, 'tasks', String(ulrId));

        async function handleReadTask() {
            const snapshot = await getDoc(docRef);
            if (snapshot.data() === undefined) {
                router.push('/');
            }

            if (
                snapshot.exists() &&
                !snapshot.data()?.isPublic &&
                data?.user?.email !== snapshot.data()?.userEmail
            ) {
                router.push('/');
            }

            const taskData = {
                task: snapshot.data()?.task,
                isPublic: snapshot.data()?.isPublic,
                created: snapshot.data()?.created,
                userEmail: snapshot.data()?.userEmail,
                userName: snapshot.data()?.userName,
                taskId: ulrId,
            };

            setTask(taskData);
        }

        handleReadTask();
    }, [ulrId, data, router]);

    const handleNewComment = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'comments'), {
                comment: comment,
                created: format(new Date(), 'dd/MM/yyyy'),
                userEmail: data?.user?.email,
                userName: data?.user?.name,
                taskId: ulrId,
            });
            setComment('');
            handleShowToast();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (taskId: string) => {
        const docRef = doc(db, 'comments', taskId);
        await deleteDoc(docRef);
    };

    const handleShowToast = () => {
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className='w-full max-w-[900px] mx-auto mt-10'>
            <Toast
                text='Sucesso'
                showToast={showToast}
                setShowToast={setShowToast}
            />
            {task && (
                <div className='mt-10'>
                    <header className='space-y-8'>
                        <div className='inline-block'>
                            <Link
                                href={'/dashboard'}
                                className='flex items-center  gap-2 hover:text-blue-400 transition-colors'
                            >
                                <ArrowLeft size={20} />
                                <p>Voltar</p>
                            </Link>
                        </div>
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
            )}

            {task?.isPublic && (
                <div className='space-y-16 mt-16'>
                    <div className='w-full h-px bg-zinc-600' />

                    <form onSubmit={handleNewComment}>
                        <Textarea
                            required
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            label='Escreva o seu comentário'
                        />

                        <button
                            disabled={!data?.user}
                            type='submit'
                            className='btn-primary w-full py-3 mt-8 disabled:opacity-50 cursor-not-allowed'
                        >
                            Comentar
                        </button>
                    </form>

                    <div>
                        <h2 className='text-2xl'>Todos os comentários</h2>
                        <div className='mt-8 flex flex-col gap-4 pb-10'>
                            {allComments.map((item) => (
                                <Comment
                                    key={item.id}
                                    comment={item.comment}
                                    created={item.created}
                                    userEmail={item.userEmail}
                                    userName={item.userName}
                                    id={item.id}
                                    handleDeleteComment={handleDeleteComment}
                                />
                            ))}

                            {allComments.length == 0 && (
                                <p className='text-sm text-zinc-600'>
                                    Nenhum comentário encontrado.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
