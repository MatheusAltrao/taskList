import Alert from '@/components/(dialog)/Alert';
import { Tooltip } from '@material-tailwind/react';

interface CommentProps {
    id: string;
    comment: string;
    created: string;
    userEmail: string;
    userName: string;

    handleDeleteComment: (taskId: string) => void;
}

const Comment = ({
    id,
    comment,
    created,
    userEmail,
    userName,

    handleDeleteComment,
}: CommentProps) => {
    const onDelete = (taskId: string) => {
        handleDeleteComment(taskId);
    };

    return (
        <div className=' py-4 border  border-zinc-600 rounded flex items-center justify-between px-2 hover:border-zinc-200 transition-colors '>
            <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                    <div className='h-6 px-2 flex items-center rounded  bg-zinc-400 justify-center'>
                        <Tooltip
                            content={
                                <div className=' bg-zinc-900 rounded-lg p-2'>
                                    <p>{userEmail}</p>
                                </div>
                            }
                            placement='top'
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}
                        >
                            <p className='  text-zinc-950  font-semibold text-xs'>
                                {userName}
                            </p>
                        </Tooltip>
                    </div>
                    <p className='text-sm text-zinc-500'>{created}</p>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <p className=' whitespace-pre-wrap'>{comment}</p>
                </div>
            </div>

            <Alert id={id} handleDelete={onDelete} />
        </div>
    );
};

export default Comment;
