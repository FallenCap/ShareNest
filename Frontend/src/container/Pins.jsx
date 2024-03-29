import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  NavBar,
  Feed,
  Search,
  PinDetail,
  CreatePin,
} from '../components/index';

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // console.log(searchTerm)
  return (
    <div className="px-2 md:px-5">
      <div>
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
