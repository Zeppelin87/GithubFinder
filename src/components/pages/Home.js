import React, { Fragment } from 'react';
import Search from '../users/Search';
import Users from '../users/Users';

// no 'return' needed since we are using an arrow function(?)
const Home = () => (
  <Fragment>
    <Search />
    <Users />
  </Fragment>
);

export default Home;
