import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const Textarea = ({ label, ...rest }: TextareaProps) => {
    return (
        <div className='space-y-4'>
            <label className='text-2xl ' htmlFor='taskName'>
                {label}
            </label>

            <div className='h-[200px]'>
                <textarea
                    className='bg-transparent rounded border border-zinc-600 resize-none h-full w-full p-4'
                    name='taskName'
                    id='taskName'
                    placeholder='Insira o seu texto aqui'
                    {...rest}
                ></textarea>
            </div>
        </div>
    );
};

export default Textarea;
