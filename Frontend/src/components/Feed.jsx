import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonaryLayout from './MasonaryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    //For the search query.
    setLoading(true);
    if (categoryId) {
      //When we search something.
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      //When we are on the feed page.
      // it will retreive the all data and show it on a descending order of creating date.
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    // If the loading is true then it returns the below component.
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  if (!pins?.length) {
    return (
      <h2 className="flex justify-center items center">No pins available</h2>
    );
  }

  return <div>{pins && <MasonaryLayout pins={pins} />}</div>;
};

export default Feed;
