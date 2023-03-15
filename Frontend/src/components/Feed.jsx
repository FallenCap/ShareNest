import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import MasonaryLayout from './MasonaryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    // If the loading is true then it returns the below component.
    return <Spinner message="We are adding new ideas to your feed!" />;
  }
  return <div></div>;
};

export default Feed;
