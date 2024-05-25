'use client'
import { Comment } from '@/components/models/comments';
import { News, otirikNews } from '@/components/models/news';
import CommentBox from '@/components/posts/comment';
import { CategoryList, formatDate } from '@/components/posts/news_card';
import MyFaceBookIcon from '@/public/facebook';
import TwitterIconSolid from '@/public/twitter';
import MyVkIcon from '@/public/vk';
import { HandThumbUpIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, VKShareButton } from 'react-share';
import { fetchArticleData } from './fetchArticle';
import NewsPageLoading from '@/components/loaders/news-page-loading';
import NotFoundError from '@/components/loaders/news-page-error';


const link = "https://magzhan-kz.vercel.app/news/"

export default function NewsPage({ params }: { params: { uuid: string } }) {
    let uuid: string = params.uuid;
    const [article, setArticle] = useState<News>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [liked, setLiked] = useState<boolean>(false);
    const [likeNum, setLikeNum] = useState<number>(Math.floor(Math.random() * 100));
    const [newComment, setNewComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchArticleData(uuid);
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
                setArticle(otirikNews[0]);
            } finally {
                setLoading(false);
            }
        }

        getData();

        const storedLikeNum = JSON.parse(localStorage.getItem(`likes-num-${uuid}`) || '0') || likeNum;
        const storedComments = JSON.parse(localStorage.getItem(`comments-${uuid}`) || '[]') || [];
        const storedLiked = JSON.parse(localStorage.getItem(`liked-${uuid}`) || 'false');

        setLikeNum(storedLikeNum);
        setComments(storedComments);
        setLiked(storedLiked);

    }, [uuid]);

    const handleAddComment = () => {
        const comment: Comment = { id: comments.length, content: newComment, username: "Сіз", published_at: new Date() };
        const updatedComments = [comment, ...comments];
        setComments(updatedComments);
        setNewComment('');
        localStorage.setItem(`comments-${uuid}`, JSON.stringify(updatedComments));
    };

    const handleEditComment = (editedComment: Comment) => {
        const updatedComments = comments.map(comment =>
            comment.id === editedComment.id ? editedComment : comment
        );
        setComments(updatedComments);
        localStorage.setItem(`comments-${uuid}`, JSON.stringify(updatedComments));
    };

    const handleDeleteComment = (id: number) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
        localStorage.setItem(`comments-${uuid}`, JSON.stringify(updatedComments));
    };

    const handleLike = () => {
        const newLikedStatus = !liked;
        const newLikeNum = likeNum + (newLikedStatus ? 1 : -1);

        setLiked(newLikedStatus);
        setLikeNum(newLikeNum);

        localStorage.setItem(`likes-num-${uuid}`, JSON.stringify(newLikeNum));
        localStorage.setItem(`liked-${uuid}`, JSON.stringify(newLikedStatus));
    }

    if (loading) return <NewsPageLoading />;
    if (!article) return <NotFoundError />;

    return (
        <>
            <head>
                <meta property="og:image" content={article.image_url} />
            </head>
            <div className='bg-white w-full flex justify-center items-center'>
                <div className='flex flex-col w-1/2 '>
                    <h1 className='font-extrabold text-4xl'>{article.title}</h1>
                    <div className='my-5 flex items-center'>
                        <CategoryList newsCategories={article.categories} />
                        <p className='mx-5 text-xl'>{formatDate(article.published_at)}</p>
                    </div>


                    <img src={article.image_url} className="rounded-3xl my-5" />

                    <p className='text-2xl'>{article.description}</p>
                    <p className='text-2xl'>{article.snippet}</p>

                    <div className='my-10 w-full flex items-center justify-between gap-8 text-xl'>
                        <button onClick={handleLike} className={`hover:opacity-80 transition-all w-full rounded-full px-5 py-3 flex items-center justify-center font-bold ${liked ? "bg-[#FF6D6D] text-white" : "bg-main-gray"}`}>
                            <HandThumbUpIcon className='w-8 mx-2' />
                            Ұнайды ({likeNum})
                        </button>
                        <div className={`transition-all w-full rounded-full px-5 py-3 flex items-center justify-center font-bold bg-main-gray gap-2`}>
                            <TwitterShareButton className="hover:fill-gray-600" url={link + uuid} title={article.title} >
                                <TwitterIconSolid />
                            </TwitterShareButton>
                            <FacebookShareButton className="hover:fill-gray-600" url={link + uuid} title={article.title}>
                                <MyFaceBookIcon />
                            </FacebookShareButton>
                            <VKShareButton className="hover:fill-gray-600" url={link + uuid} title={article.title}>
                                <MyVkIcon />
                            </VKShareButton>
                        </div>

                    </div>

                    <div className='my-10 w-full'>
                        <h2 className='text-xl'>Пікірлер ({comments.length})</h2>
                        <ul className='w-full'>
                            {comments.map((comment, index) => (
                                <CommentBox key={index} comment={comment} onEdit={handleEditComment} onDelete={handleDeleteComment} />
                            ))}
                        </ul>
                        <textarea
                            className="w-full text-left break-words my-5 text-xl text-gray-600 rounded-3xl p-5 bg-main-gray focus:outline-none"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder='Пікіріңізді қалдырыңыз...'
                        />
                        <div className='w-full flex justify-end'>
                            <button className=' transition-all hover:bg-theme-blue/80 rounded-3xl bg-theme-blue text-white py-2 px-20 text-2xl' onClick={handleAddComment}>Қосу</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

