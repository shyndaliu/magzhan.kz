import { useState } from 'react';
import { Comment } from '../models/comments';
import { formatDate } from './news_card';
import ProfilePic from './profile_pic';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

export default function CommentBox(props: { comment: Comment, onEdit: (comment: Comment) => void, onDelete: (id: number) => void }) {
    const { comment, onEdit, onDelete } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const handleSave = () => {
        onEdit({ ...comment, content: editContent });
        setIsEditing(false);
    };

    return (
        <div className="flex flex-row my-5 w-full gap-10">
            <ProfilePic imageUrl={null} />
            <div className="border-b-2 w-full">
                <div className="flex gap-6 items-center">
                    <p className="text-xl">{comment.username}</p>
                    <p className="text-gray-300">{formatDate(comment.published_at)}</p>
                </div>
                {isEditing ? (
                    <div>
                        <textarea
                            className="w-full text-left break-words my-5 text-xl text-gray-600 rounded-3xl p-5 bg-main-gray focus:outline-none"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <button className='transition-all hover:bg-theme-blue/80 rounded-3xl bg-theme-blue text-white py-2 px-4 text-xl mr-5' onClick={handleSave}>Сақтау</button>
                        <button className='transition-all hover:bg-main-gray/80 rounded-3xl bg-main-gray py-2 px-4 text-xl mr-5' onClick={() => setIsEditing(false)}>Бас тарту</button>
                    </div>
                ) : (
                    <p className="w-full text-left break-words my-5 text-xl text-gray-600">{comment.content}</p>
                )}
                <div className="flex gap-2 justify-end my-2">
                    <button onClick={() => setIsEditing(true)}><PencilIcon className='w-5' /></button>
                    <button onClick={() => onDelete(comment.id)}><TrashIcon className='w-5 text-red-500' /></button>
                </div>
            </div>
        </div>
    );
}
