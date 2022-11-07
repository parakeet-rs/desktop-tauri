import produce from 'immer';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { SetterOrUpdater } from 'recoil';
import { Path } from '../types/fun';

export function createRecoilSetter<T>(
  setter: SetterOrUpdater<T>,
  path: Path<T>
): (
  v: string | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => void {
  const [childNodes, lastKey] = useMemo(() => {
    const childNodes = [...path] as string[];
    const lastKey = childNodes.pop()!;
    return [childNodes, lastKey];
  }, [(path as string[]).join('.')]);

  return useCallback(
    (value) => {
      const textValue = typeof value === 'string' ? value : value.target.value;
      setter((prev: T) => {
        return produce(prev, (draft) => {
          let root = childNodes.reduce(
            (root, key) => root[key] as Record<string, unknown>,
            draft as Record<string, unknown>
          );
          root[lastKey] = textValue;
        });
      });
    },
    [childNodes, lastKey]
  );
}
