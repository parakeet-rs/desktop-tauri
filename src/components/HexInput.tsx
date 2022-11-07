import { Box, FormLabel, Text, Textarea } from '@chakra-ui/react';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { normaliseHexString } from '../utils/normaliseHexString';

export interface HexInputProps {
  title: ReactNode;
  description?: ReactNode;

  value: string;
  onChange: (value: string) => void;
}

export function HexInput({
  title,
  description,
  value,
  onChange,
}: HexInputProps) {
  const [controlledValue, setControlledValue] = useState('');

  useEffect(() => {
    setControlledValue(normaliseHexString(value));
  }, [value]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      let inputValue = e.target.value;
      setControlledValue(inputValue);
    },
    []
  );
  const validateAndReset = useCallback(() => {
    setControlledValue((oldValue) => {
      const hexString = normaliseHexString(oldValue);
      onChange(hexString);
      return hexString;
    });
  }, []);

  return (
    <Box>
      <FormLabel>
        <Text>{title}</Text>
        <Textarea
          fontFamily="var(--parakeet-font-mono)"
          value={controlledValue}
          onChange={handleInputChange}
          onBlur={validateAndReset}
          placeholder="0x00, 0x01, ..."
          size="sm"
        />
      </FormLabel>
      {description && (
        <Text color="gray.500" fontSize="smaller">
          {description}
        </Text>
      )}
    </Box>
  );
}
