import Alert from '@/components/(dialog)/Alert';
import { Eye, Forward } from 'lucide-react';
import Link from 'next/link';

interface TaskProps {
    taskId: string;
    taskDescription: string;
    isPublic: boolean;
    handleShareTask: (taskId: string) => void;
    handleDeleteTask: (taskId: string) => void;
}

const Task = ({
    taskId,
    taskDescription,
    isPublic,
    handleShareTask,
    handleDeleteTask,
}: TaskProps) => {
    const onShare = (taskId: string) => {
        handleShareTask(taskId);
    };

    const onDelete = (taskId: string) => {
        handleDeleteTask(taskId);
    };

    return (
        <div className=' py-4 border  border-zinc-600 rounded flex items-center justify-between px-2 hover:border-zinc-200 transition-colors '>
            <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                    {isPublic ? (
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

                    <Link
                        href={`/task/${taskId}`}
                        title='Ver detalhes'
                        className='btn-primary h-6 hover:text-blue-300 px-1 flex items-center justify-center'
                    >
                        <Eye size={16} />
                    </Link>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <p className=' whitespace-pre-wrap'>{taskDescription}</p>
                </div>
            </div>

            <Alert taskId={taskId} handleDeleteTask={onDelete} />
        </div>
    );
};

export default Task;
