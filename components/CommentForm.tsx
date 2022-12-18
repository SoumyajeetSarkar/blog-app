import React, { useRef, useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { submitComment } from "../services";
const CommentForm = ({ slug }: any) => {
  const [error, setError] = useState(false);
  const [comment,setComment] = useState('');
  const [localStorage,setLocalStorage] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentRef = useRef() as any;
  const nameRef = useRef() as any;
  const emailRef = useRef() as any;
  const storeDataRef = useRef() as any;

  useEffect(() => {
    nameRef.current.value = window.localStorage.getItem('name');
    emailRef.current.value = window.localStorage.getItem('email');
  }, [])
  

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentRef.current;
    const { value: name } = nameRef.current;
    const { value: email } = emailRef.current;
    const { checked: storeData } = storeDataRef.current;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug };
    if (storeData) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("name", name);
      setLocalStorage({email:email,name:name});
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      setComment('');
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Comment"
          ref={commentRef}
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
          ref={nameRef}
          value={localStorage?.name}
        />
        <input
          type="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
          ref={emailRef}
          value={localStorage?.email}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            onChange={() => {}}
            type="checkbox"
            id="storeData"
            ref={storeDataRef}
            name="storeData"
            className="cursor-pointer"
          />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            {" "}
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-flex bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Comment
          <FiSend size={30} className="ml-2" />
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
