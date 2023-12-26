import { Check, X } from 'lucide-react';

interface ToastProps {
    text: string;
    showToast: boolean;
    setShowToast: (v: boolean) => void;
}

const Toast = ({ text, showToast, setShowToast }: ToastProps) => {
    return (
        <div
            id='toast-success'
            className={` ${
                showToast ? 'opacity-100' : 'opacity-0'
            } transition-opacity flex items-center fixed top-4 right-4 w-full max-w-xs p-4 mb-4 text-zinc-500 bg-zinc-900 rounded-lg shadow`}
            role='alert'
        >
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-green-800 text-green-200'>
                <Check size={20} />
            </div>
            <div className='ms-3 text-sm font-normal'>{text}</div>
            <button
                onClick={() => setShowToast(false)}
                className='ms-auto -mx-1.5 -my-1.5  text-zinc-200  rounded focus:ring-2  p-1.5 inline-flex items-center justify-center h-8 w-8 transition-colors hover:text-white bg-zinc-800 hover:bg-zinc-700'
            >
                <X size={20} />
            </button>
        </div>
    );
};

export default Toast;
