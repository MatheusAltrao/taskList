import { Tooltip } from '@material-tailwind/react';
import { Info } from 'lucide-react';

const Icon = () => {
    return (
        <div className='flex items-center gap-2'>
            <h2 className='text-2xl'>Minhas tasks</h2>

            <Tooltip
                content={
                    <div className='w-80 bg-zinc-900 rounded-lg p-2'>
                        <p>
                            Clique no olho da Task e você será levado a uma
                            visualização mais detalhada, proporcionando
                            informações adicionais sobre a task
                        </p>
                    </div>
                }
                placement='top'
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
            >
                <Info className='text-blue-500' size={18} />
            </Tooltip>
        </div>
    );
};

export default Icon;
