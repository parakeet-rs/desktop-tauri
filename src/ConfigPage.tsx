import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spacer,
  Tab,
  TabPanels,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { LeftTabList, LeftTabs } from './components/LeftTab';
import { GeneralConfigPanel } from './config/GeneralConfigPanel';
import { KugouConfigPanel } from './config/KugouConfigPanel';
import { QmcConfigPanel } from './config/QmcConfigPanel';
import { XmlyConfigPanel } from './config/XmlyConfigPanel';
import { appConfigState } from './states/configState';
import { fetchConfig, saveConfig } from './utils/remoteMethods';

const noop = () => {};

export function ConfigPage() {
  const [isBusy, setIsBusy] = useState(false);
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleOptionOpen = useCallback(async () => {
    setIsBusy(true);
    const latestAppConfig = await fetchConfig();
    setAppConfig(latestAppConfig);
    setIsBusy(false);
    onOpen();
  }, [isOpen]);

  const dismissConfigHandler = useCallback(async () => {
    setAppConfig(await fetchConfig());
    onClose();
  }, []);

  const applyConfigHandler = useCallback(async () => {
    await saveConfig(appConfig);
    onClose();
  }, [appConfig]);

  return (
    <>
      <Button
        ref={btnRef}
        isLoading={isBusy}
        colorScheme="teal"
        size="sm"
        onClick={handleOptionOpen}
      >
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
                <GeneralConfigPanel />
                <QmcConfigPanel />
                <KugouConfigPanel />
                <XmlyConfigPanel />
              </TabPanels>
            </LeftTabs>
          </DrawerBody>

          <DrawerFooter w="100%">
            <Button variant="outline" mr={3} onClick={dismissConfigHandler}>
              放弃更改
            </Button>
            <Spacer />
            <Button colorScheme="blue" onClick={applyConfigHandler}>
              应用设定
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
