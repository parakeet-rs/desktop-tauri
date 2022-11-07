import { useCallback } from 'react';
import { Container, Button, Stack, Center } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { processFileListState } from './states/processFilesState';
import { FileTable } from './components/FileTable';

function App() {
  const [fileList, setFileList] = useRecoilState(processFileListState);

  const handleFileClick = useCallback(() => {}, []);

  // TODO: Respond to file drag-over.
  return (
    <Container mt={3}>
      <Center>
        <Stack direction="row" spacing={4}>
          <Center>
            <span>拖入文件或</span>
          </Center>
          <Button
            type="button"
            onClick={handleFileClick}
            colorScheme="teal"
            size="sm"
          >
            点我选择文件
          </Button>
        </Stack>
      </Center>

      <FileTable files={fileList} />
    </Container>
  );
}

export default App;
