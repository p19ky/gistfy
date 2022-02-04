import React from 'react';
import { VStack, Flex, Container, Spinner, Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import Logo from '../components/Logo';
import Search from '../components/Search';
import UserCard from '../components/UserCard';

const Home = () => {
  const searchResults = useSelector(state => state.github.value.searchResults);
  const searchResultsLoading = useSelector(
    state => state.github.loadingSearchResults
  );

  React.useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <Flex flex={1} direction="column" minH="100vh" p={2}>
      <ColorModeSwitcher alignSelf="flex-end" />
      <VStack spacing={8} flex={1}>
        <Logo h="20vmin" pointerEvents="none" />
        <Search />
        <Container
          as={Grid}
          maxW="container.lg"
          gridTemplateColumns="repeat(auto-fit, minmax(256px, 1fr))"
          gridGap={4}
        >
          {searchResultsLoading && <Spinner justifySelf="center" />}
          {React.Children.toArray(
            searchResults.map(result => <UserCard image={result.avatar_url} username={result.login} />)
          )}
        </Container>
      </VStack>
    </Flex>
  );
};

export default Home;
