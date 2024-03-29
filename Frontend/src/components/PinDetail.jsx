import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../client';
import MasonaryLayout from './MasonaryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) {
    return <Spinner message="Loading pin..." />;
  }

  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto"
        style={{ maxWidth: '700px', borderRadius: '32px' }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial hover:drop-shadow-3xl">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt={`${pinDetail.title}.img`}
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620px">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-[#334756] text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target="_blank"
              rel="noreferrer"
              className="bg-white h-9 px-2 font-bold rounded-full flex items-center justify-center text-[#334756] opacity-75 hover:opacity-100 hover:shadow-md outline-none"
            >
              {pinDetail.destination.length > 15
                ? `${pinDetail.destination.slice(0, 15)}...`
                : pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl text-[#ff4c29] font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3 text-white text-xl">{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail?._id}`}
            className="flex gap-2 mt-5 items-center rounded-lg"
          >
            <img
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <p className="font-semibold capitalize">{pinDetail?.userName}</p>
          </Link>
          <h2 className="mt-7 text-3xl text-bold text-white">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div className="flex gap-2 mt-5 items-center rounded-lg" key={i}>
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-white">
                    {comment.postedBy.userName}
                  </p>
                  <p className="text-white">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`user-profile/${pinDetail?._id}`}>
              <img
                src={pinDetail.postedBy?.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input
              type="text"
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-[#ff4c29] text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center text-white font-bold text-2x mt-8 mb-4">
            More like this
          </h2>
          <MasonaryLayout pins={pins} />
        </>
      ) : (
        <div className="mt-8">
          <Spinner message="Loading more pins..." />
        </div>
      )}
    </>
  );
};

export default PinDetail;
