import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { Button, Flex, Heading, Spinner } from '@chakra-ui/react';

import { currentUserAsyncThunk } from '../state/github/async/currentUserAsyncThunk';

const User = () => {
  const [gists, setGists] = React.useState([]);

  const { username } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.github.value.currentUser);
  const currentUserLoading = useSelector(
    state => state.github.value.currentUser
  );
  const currentUserError = useSelector(state => state.github.value.currentUser);

  React.useEffect(() => {
    if (!currentUser && !currentUserLoading && !currentUserError) {
      dispatch(currentUserAsyncThunk({ username }));
    }
  }, [currentUser, currentUserLoading, currentUserError, dispatch, username]);

  React.useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Flex minH={'100vh'} flex={1} justify="center" align="center">
      <Button as={ReactRouterLink} to={'/'} position="absolute" top="0" left="0" m={2}>
        home
      </Button>
      {!currentUser ? <Spinner /> : <Heading>{currentUser.login}</Heading>}
    </Flex>
  );
};

export default User;
