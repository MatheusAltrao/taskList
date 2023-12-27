'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Textarea from './components/(form)/Textarea';
import Task from './components/(task)/Task';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { db } from '@/services/firebaseConnection';
import { useRouter } from 'next/router';
import {
    addDoc,
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
    doc,
    deleteDoc,
} from 'firebase/firestore';
import { format } from 'date-fns';
import Icon from './components/(Icon)/Icon';
import Toast from '@/components/(toast)/Toast';

type TasksType = {
    id: string;
    created: Date;
    isPublic: boolean;
    task: string;
    userEmail: string;
    userName: string;
};

export default function Dashboard() {
    const { data } = useSession();
    const [taskDescription, setTaskDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const [tasks, setTasks] = useState<TasksType[]>([]);
    const [showToast, setShowToast] = useState(false);

    if (!data?.user) {
        redirect('/');
    }

    useEffect(() => {
        async function loadTasks() {
            const taskRef = collection(db, 'tasks');
            const q = query(
                taskRef,
                orderBy('created', 'desc'),
                where('userEmail', '==', data?.user?.email),
            );

            onSnapshot(q, (snapshot) => {
                let list = [] as TasksType[];

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        created: doc.data().created,
                        isPublic: doc.data().isPublic,
                        task: doc.data().task,
                        userEmail: doc.data().userEmail,
                        userName: doc.data().userName,
                    });
                });

                setTasks(list);
            });
        }
        loadTasks();
    }, [data]);

    const handleRegisterTask = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'tasks'), {
                task: taskDescription,
                isPublic: isPublic,
                created: format(new Date(), 'dd/MM/yyyy'),
                userEmail: data?.user?.email,
                userName: data?.user?.name,
            });

            setTaskDescription('');
            setIsPublic(false);
            handleShowToast();
        } catch (error) {
            console.log(error);
        }
    };

    const handleShareTask = async (taskId: string) => {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${taskId}`,
        );

        console.log(taskId);
    };

    const handleDeleteTask = async (taskId: string) => {
        const docRef = doc(db, 'tasks', taskId);
        await deleteDoc(docRef);
    };

    const handleShowToast = () => {
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };
    return (
        <div className='w-full max-w-[900px] mx-auto'>
            <Toast
                text='Sucesso'
                showToast={showToast}
                setShowToast={setShowToast}
            />
            <main className='space-y-16 mt-10'>
                <form onSubmit={handleRegisterTask}>
                    <Textarea
                        required
                        label='Qual a sua task?'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />

                    <div className='flex items-center mt-2 gap-2'>
                        <input
                            checked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}
                            type='checkbox'
                            className='rounded text-sm bg-transparent border border-zinc-400  focus:ring-0  focus:ring-offset-0 '
                        />
                        <p className='text-zinc-300'>Deixar task pública?</p>
                    </div>

                    <button
                        type='submit'
                        className='btn-primary w-full py-3 mt-8   '
                    >
                        Registrar
                    </button>
                </form>

                <div className='w-full h-px bg-zinc-600' />

                <div>
                    <Icon />

                    <div className='mt-8 flex flex-col gap-4 pb-10'>
                        {tasks.map((task) => (
                            <Task
                                key={task.id}
                                taskId={task.id}
                                taskDescription={task.task}
                                isPublic={task.isPublic}
                                handleShareTask={handleShareTask}
                                handleDeleteTask={handleDeleteTask}
                            />
                        ))}

                        {tasks.length == 0 && (
                            <p className='text-zinc-600 text-sm '>
                                Nenhuma tarefa encontrada.
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
