import { useCallback } from 'react';
import { Button, Center, Flex, Box, Heading } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { processFileListState } from './states/processFilesState';
import { FileTable } from './components/FileTable';
import { ConfigPage } from './ConfigPage';

function App() {
  const [fileList, setFileList] = useRecoilState(processFileListState);

  const handleFileClick = useCallback(() => {}, []);

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
          <FileTable files={fileList} />
        </Box>
        <Box borderTop="1px solid" borderTopColor="teal.300" p={2}>
          <Center>
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
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
