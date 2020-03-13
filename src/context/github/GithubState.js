import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './GithubReducer';
import {
  GET_USER,
  SEARCH_USERS,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING
} from '../types';

// this will include all of our actions as well
//
// Dispatching to Reducer:
// 1. Call an action (make an http-request to github)
// 2. Get a response
// 3. Dispatch a type back to our reducer
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading(); // Show the loading spinner.

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ); // Make an async HttpRequest to get users by the search paramater ('~/users?q={}').

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    }); // dispatch the httpResponse.data to the GithubReducer.js
  };

  // Get User
  const getUser = async username => {
    setLoading(); // Show the loading spinner.

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ); // Make an async HttpRequest to get users by username.

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Get Repos
  const getUserRepos = async username => {
    setLoading(); // Show the loading spinner.

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ); // Make an async HttpRequest to repos for a given user.

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Set Loading
  //
  // Reducer listens to the type - 'SET_LOADING' - & carries out an action respectively
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
