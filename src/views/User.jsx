import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Code,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { currentUserAsyncThunk } from '../state/github/async/currentUserAsyncThunk';
import { octokit } from '../utils/helpers';

const BADGE_COLOR_SCHEMES = [
  'whiteAlpha',
  'blackAlpha',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
  'linkedin',
  'facebook',
  'messenger',
  'whatsapp',
  'twitter',
  'telegram',
];

const User = () => {
  const [gists, setGists] = React.useState([]);
  const [loadingGists, setLoadingGists] = React.useState(false);
  const [currentOpenGist, setCurrentOpenGist] = React.useState(null);
  const [currentViewedFileContent, setCurrentViewedFileContent] =
    React.useState('');
  const [fileViewMode, setFileViewMode] = React.useState(false);
  const [currentBadges, setCurrentBadges] = React.useState([]);
  const [currentLatestForks, setCurrentLatestForks] = React.useState([]);
  const {
    isOpen: isOpenGistModal,
    onOpen: onOpenGistModal,
    onClose: onCloseGistModal,
  } = useDisclosure();
  const okButtonModalRef = React.useRef();

  const { username } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.github.value.currentUser);
  const currentUserLoading = useSelector(
    state => state.github.loadingCurrentUser
  );
  const currentUserError = useSelector(state => state.github.errorCurrentUser);

  // if came directly to link, without search
  React.useEffect(() => {
    if (!currentUser && !currentUserLoading && !currentUserError) {
      dispatch(currentUserAsyncThunk({ username }));
    }
  }, [currentUser, currentUserLoading, currentUserError, dispatch, username]);

  React.useEffect(() => {
    if (!currentUser) return;

    (async () => {
      try {
        setLoadingGists(true);

        const response = await octokit.request('GET /users/{username}/gists', {
          username: currentUser.login,
        });

        setGists(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingGists(false);
      }
    })();
  }, [currentUser]);

  const handleOpenGist = gist => {
    setCurrentOpenGist(gist);
    onOpenGistModal();
    handleCreateBadges(gist);
    handleGetLatestForks(gist);
  };

  const handleCreateBadges = gist => {
    const setOfFileTypes = Array.from(
      new Set(Object.values(gist.files).map(f => f.type))
    );

    const randomUniqueColours = BADGE_COLOR_SCHEMES.sort(
      () => 0.5 - Math.random()
    ).slice(0, setOfFileTypes.length);

    setCurrentBadges(
      setOfFileTypes.map((ft, i) => ({
        fileType: ft,
        colorScheme: randomUniqueColours[i],
      }))
    );
  };

  const handleGetLatestForks = async gist => {
    try {
      const response = await axios.get(gist.forks_url);
      const forks = response.data;
      const sortedForks = forks.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setCurrentLatestForks(sortedForks.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseGistModal = () => {
    onCloseGistModal();
    setCurrentOpenGist(null);
    setFileViewMode(false);
    setCurrentBadges([]);
    setCurrentLatestForks([]);
  };

  const handleCloseViewRaw = () => {
    setFileViewMode(false);
    setCurrentViewedFileContent('');
  };

  const handleViewRaw = async file => {
    setFileViewMode(true);

    try {
      const response = await axios.get(file[1].raw_url);

      setCurrentViewedFileContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex minH={'100vh'} flex={1} direction="column">
      <Button as={ReactRouterLink} to={'/'} m={2} alignSelf="flex-start">
        home
      </Button>
      {currentUserLoading ? (
        <Spinner alignSelf="center" />
      ) : currentUserError ? (
        <Heading align="center">Something went wrong... 😢</Heading>
      ) : (
        currentUser && (
          <Container maxW="container.sm" as={VStack} alignItems="stretch">
            <Heading align="center">{currentUser.login}'s gists</Heading>
            <Divider />
            {loadingGists && <Spinner alignSelf={'center'} />}
            {React.Children.toArray(
              gists.map(gist => {
                const gistName = gist.description || `gist ${gist.id}`;

                return (
                  <HStack boxShadow={'lg'} p={4} rounded="md">
                    {<Text align="left">{gistName}</Text>}
                    <Spacer />
                    <Button
                      colorScheme="teal"
                      onClick={() => handleOpenGist({ ...gist, gistName })}
                    >
                      Open
                    </Button>
                  </HStack>
                );
              })
            )}
          </Container>
        )
      )}

      <Modal
        initialFocusRef={okButtonModalRef}
        isOpen={isOpenGistModal}
        onClose={handleCloseGistModal}
        size={fileViewMode ? 'full' : 'sm'}
      >
        <ModalOverlay />
        {currentOpenGist && (
          <ModalContent>
            <ModalHeader>{currentOpenGist.gistName}</ModalHeader>
            {fileViewMode ? (
              <Flex flex={1}>
                {React.Children.toArray(
                  <Code flex={1} px={4}>
                    {React.Children.toArray(
                      currentViewedFileContent.split('\n').map(line =>
                        !line ? (
                          <br />
                        ) : (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: line.replace(/^[ \t]+/gm, function (x) {
                                return new Array(x.length + 1).join('&nbsp;');
                              }),
                            }}
                          ></p>
                        )
                      )
                    )}
                  </Code>
                )}
              </Flex>
            ) : (
              <ModalBody>
                <Wrap wrap={'wrap'} mb={4}>
                  {React.Children.toArray(
                    currentBadges.map(b => (
                      <WrapItem>
                        <Badge colorScheme={b.colorScheme}>{b.fileType}</Badge>
                      </WrapItem>
                    ))
                  )}
                </Wrap>
                {!!currentLatestForks.length && (
                  <HStack>
                    <Text fontWeight={'bold'}>Latest forkers: </Text>
                    <Wrap wrap={'wrap'} mb={4}>
                      {React.Children.toArray(
                        currentLatestForks.map(fork => (
                          <WrapItem>
                            <Avatar
                              name={fork.owner.login}
                              src={fork.owner.avatar_url}
                            />
                          </WrapItem>
                        ))
                      )}
                    </Wrap>
                  </HStack>
                )}
                {React.Children.toArray(
                  Object.entries(currentOpenGist.files).map(file => {
                    return (
                      <HStack boxShadow={'lg'} p={4} rounded="md" mb={2}>
                        {<Text align="left">{file[0]}</Text>}
                        <Spacer />
                        <Button onClick={() => handleViewRaw(file)}>
                          View Raw
                        </Button>
                      </HStack>
                    );
                  })
                )}
              </ModalBody>
            )}

            <ModalFooter>
              <Button
                ref={okButtonModalRef}
                onClick={
                  fileViewMode ? handleCloseViewRaw : handleCloseGistModal
                }
              >
                Ok
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </Flex>
  );
};

export default User;
