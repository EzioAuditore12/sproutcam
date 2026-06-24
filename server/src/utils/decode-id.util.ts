import { Buffer } from 'node:buffer';

export const decodeId = (id: string) => {
  try {
    // Attempt to decode as base64 first
    return BigInt(Buffer.from(id, 'base64').toString('utf-8'));
  } catch {
    // Fallback if it's already a plain string/number
    return BigInt(id);
  }
};
