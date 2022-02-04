import {
  Box,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import {
  Link as ReactRouterLink,
} from "react-router-dom";

const UserCard = ({image, username}) => {
  return (
    <Box
      as={ReactRouterLink}
      to={`/user/${username}`}
      bg={"teal.400"}
      shadow="dark-lg"
      rounded="lg"
      overflow="hidden"
      mx="auto"
    >
      <Image w={"256px"} fit="cover" src={image} alt="avatar" fallbackSrc='https://via.placeholder.com/256'/>
      <Box py={5} textAlign="center">
        <Text
          fontSize="2xl"
          color={'white'}
          fontWeight="bold"
        >
          {username}
        </Text>
      </Box>
    </Box>
  );
};

export default UserCard;
