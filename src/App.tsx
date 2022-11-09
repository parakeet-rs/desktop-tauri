import { useCallback } from 'react';
import { Button, Center, Flex, Box, Heading, useToast } from '@chakra-ui/react';
import { ConfigPage } from './ConfigPage';
import { decryptQmc2 } from './utils/remoteMethods';
import { DecryptionList } from './features/decryptionList/DecryptionList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUnprocessedFiles,
  setFileState,
} from './features/decryptionList/decryptionListSlice';
import { AppDispatch } from './app/store';

function App() {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const unprocessedFiles = useSelector(selectUnprocessedFiles);

  const handleFileClick = useCallback(() => {}, []);
  const handleQMC2Decryption = useCallback(async () => {
    for (const file of unprocessedFiles) {
      dispatch(
        setFileState({
          path: file.path,
          state: 'in-progress',
        })
      );

      await decryptQmc2(file.path).catch((err) => {
        console.error('处理文件发生错误', err);
        setFileState({
          path: file.path,
          state: 'failed',
        });
        toast({
          title: '发生错误',
          description: `处理 ${file.name} 时发生错误：${err}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });

      dispatch(
        setFileState({
          path: file.path,
          state: 'processed',
        })
      );
    }

    toast({
      title: '处理完成',
      description: '已经处理完成。',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }, [unprocessedFiles]);

  // TODO: Respond to file drag-over.
  return (
    <Box h="100vh">
      <Flex direction="column" h="100%">
        <Flex>
          <Heading flex="1" size="md" textAlign="center" p="2">
            <Center h="100%">Parakeet Desktop</Center>
          </Heading>
          <Box m="2">
            <ConfigPage />
          </Box>
        </Flex>
        <Box flex={1} flexGrow={1} overflow="auto">
          <DecryptionList />
        </Box>
        <Box borderTop="1px solid" borderTopColor="teal.300" p={2}>
          <Flex>
            <Center flex="1">
              <span>拖入文件或</span>
              <Button
                ml="0.5em"
                type="button"
                onClick={handleFileClick}
                colorScheme="teal"
                size="sm"
              >
                点我选择文件
              </Button>
            </Center>
            <Button size="sm" onClick={handleQMC2Decryption}>
              QMC2 (实验性)
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
