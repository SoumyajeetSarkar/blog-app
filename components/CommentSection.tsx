import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getComments } from '../services';
const CommentSection = ({slug}:any) => {
  const [comments, setComments] = useState([]);
  console.log(comments)
  useEffect(() => {
    getComments(slug).then((result:any) => {
      setComments(result);
    });
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {' '}
            Comments
          </h3>
            {comments.map((comment:object, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p>
                  <span className="font-semibold">{comment.name}</span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <span className='w-full text-xs align-middle'>{`<${comment.email}>`}</span>
                <p className="whitespace-pre-line text-gray-600 w-full mt-4">{comment.comment}</p>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default CommentSection