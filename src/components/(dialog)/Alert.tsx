import { Trash } from 'lucide-react';
import { Dialog } from 'primereact/dialog';
import { ReactNode, useState } from 'react';

interface AlertProps {
    taskId: string;
    handleDeleteTask: (taskId: string) => void;
}

const Alert = ({ taskId, handleDeleteTask }: AlertProps) => {
    const [visible, setVisible] = useState(false);

    const footerContent = (
        <div className='flex items-center gap-4 mt-8'>
            <button
                onClick={() => setVisible(false)}
                className='btn-secondary h-10 w-28'
            >
                Cancelar
            </button>
            <button
                className='btn-primary h-10 w-28'
                onClick={() => handleDeleteTask(taskId)}
            >
                Apagar
            </button>
        </div>
    );

    return (
        <div>
            <button
                title='Deletar'
                className='btn-primary hover:text-red-500 p-2'
                onClick={() => setVisible(true)}
            >
                <Trash size={20} />
            </button>
            <Dialog
                visible={visible}
                style={{ width: '450px' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
                className='bg-zinc-900 rounded-lg p-8'
            >
                <div>
                    <h2 className='text-2xl'>
                        Você tem certeza que deseja apagar essa tarefa?
                    </h2>
                    <div className='mt-4'>
                        <p className='text-zinc-400'>
                            Após apagar essa tarefa não terá mais como
                            recupera-la, tem certeza disso?
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Alert;
