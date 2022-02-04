import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom';
import { updateCurrentUser } from '../state/github/githubSlice';

const UserCard = ({user}) => {
  const dispatch = useDispatch();

  return (
    <Box
      as={ReactRouterLink}
      onClick={() => dispatch(updateCurrentUser(user))}
      to={`/user/${user.login}`}
      bg={'teal.400'}
      shadow="dark-lg"
      rounded="lg"
      overflow="hidden"
      mx="auto"
    >
      <Image
        w={'256px'}
        fit="cover"
        src={user.avatar_url}
        alt="avatar"
        fallbackSrc="https://via.placeholder.com/256"
      />
      <Box py={5} textAlign="center">
        <Text fontSize="2xl" color={'white'} fontWeight="bold">
          {user.login}
        </Text>
      </Box>
    </Box>
  );
};

export default UserCard;
