import React from 'react'
import appwriteService from '../appwrite/config_service';
import { Link } from 'react-router-dom';

const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
         <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
            </div>
         </div>
    </Link>
  )
}

export default PostCard