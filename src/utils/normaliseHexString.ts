export function normaliseHexString(inputString: string): string {
  const hexSegments: string[] = [];
  inputString.replace(/[0-9a-fA-F]{2}/g, (z) => {
    hexSegments.push(z);
    return '';
  });

  return hexSegments.join(' ');
}
