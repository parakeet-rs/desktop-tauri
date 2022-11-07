import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Spacer,
  Tab,
  TabPanel,
  TabPanels,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { HexInput } from './components/HexInput';
import { LeftTabList, LeftTabs } from './components/LeftTab';

const noop = () => {};

export function ConfigPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" size="sm" onClick={onOpen}>
        选项
      </Button>
      <Drawer
        size="full"
        isOpen={isOpen}
        placement="top"
        onClose={noop}
        onOverlayClick={noop}
        onEsc={noop}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent display="grid" gridTemplateRows="3.5rem auto 3.5rem">
          <DrawerHeader>Parakeet 应用设定</DrawerHeader>

          <DrawerBody pr="0">
            <LeftTabs orientation="vertical" display="grid">
              <LeftTabList>
                <Tab>通用设定</Tab>
                <Tab>QQ 音乐</Tab>
                <Tab>酷狗音乐</Tab>
                <Tab>喜马拉雅</Tab>
              </LeftTabList>

              <TabPanels>
                <TabPanel>
                  <p>通用设定</p>
                </TabPanel>
                <TabPanel>
                  <HexInput
                    value="12345"
                    onChange={console.info}
                    title="阶段 1 密钥"
                    description="(EncV2 专属) - 阶段 1 与 阶段 2 解密所需的密钥。"
                  />
                </TabPanel>
                <TabPanel>
                  <p>酷狗音乐</p>
                  <Box h="300vh" bg="tomato" />
                </TabPanel>
                <TabPanel>
                  <p>喜马拉雅</p>
                </TabPanel>
              </TabPanels>
            </LeftTabs>
          </DrawerBody>

          <DrawerFooter w="100%">
            <Button variant="outline" mr={3} onClick={onClose}>
              放弃更改
            </Button>
            <Spacer />
            <Button colorScheme="blue">应用设定</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
