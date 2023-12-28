'use client';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useEffect, useState } from 'react';

export default function Counting({ params }: Params) {
    const [posts, setPosts] = useState(0);
    const [comments, setComment] = useState(0);

    useEffect(() => {
        async function handleGetPostsAndComments() {
            const postRef = collection(db, 'tasks');
            const commentRef = collection(db, 'comments');

            const postSnapshot = await getDocs(postRef);
            const commentsSnapshot = await getDocs(commentRef);

            setPosts(postSnapshot.size);
            setComment(commentsSnapshot.size);
        }

        handleGetPostsAndComments();
    }, []);

    return (
        <div className='flex items-center flex-col sm:flex-row justify-center gap-2'>
            <div className='flex items-center flex-col sm:flex-row justifique-center gap-2'>
                <div className='card text-center py-2 w-[180px] text-sm'>
                    + {posts} postagens
                </div>
                <div className='card text-center py-2 w-[180px] text-sm'>
                    + {comments} comentários
                </div>
            </div>
        </div>
    );
}
