import { StyledSectionPanel, StyledTabPanel } from './styles';
import { HexInput } from '../components/HexInput';
import {
  Box,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { appConfigState } from '../states/configState';
import { ChangeEvent, useCallback } from 'react';
import produce from 'immer';
import { createRecoilSetter } from '../utils/createRecoilSetter';

export function QmcConfigPanel() {
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);
  const { qmc2 } = appConfig;

  const storeStage1Key = createRecoilSetter(setAppConfig, [
    'qmc2',
    'stage_1_key',
  ]);

  const storeStage2Key = createRecoilSetter(setAppConfig, [
    'qmc2',
    'stage_2_key',
  ]);

  const storeSeed = useCallback(
    (_valueAsString: string, valueAsNumber: number) => {
      setAppConfig((c) =>
        produce(c, (draft) => {
          draft.qmc2.seed = valueAsNumber;
        })
      );
    },
    []
  );

  return (
    <StyledTabPanel>
      <StyledSectionPanel title="QMC2">
        <FormLabel>
          <Text>密钥解密种子</Text>
          <NumberInput value={qmc2.seed} min={0} max={255} onChange={storeSeed}>
            <NumberInputField />
          </NumberInput>
        </FormLabel>

        <HexInput
          value={qmc2.stage_1_key}
          onChange={storeStage1Key}
          title="(EncV2) 阶段 1 密钥"
        />
        <HexInput
          value={qmc2.stage_2_key}
          onChange={storeStage2Key}
          title="(EncV2) 阶段 2 密钥"
        />
      </StyledSectionPanel>
    </StyledTabPanel>
  );
}
