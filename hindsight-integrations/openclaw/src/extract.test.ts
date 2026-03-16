
import { describe, it, expect } from 'vitest';
import { extractSenderIdFromText, extractProjectIdFromText } from './index.js';

describe('extractProjectIdFromText', () => {
  it('extracts projectId from untrusted metadata block', () => {
    const text = "\nHello\n---\nSome (untrusted metadata):\n```json\n{\n  \"projectId\": \"proj_123\"\n}\n```\n---\n";
    expect(extractProjectIdFromText(text)).toBe('proj_123');
  });

  it('extracts project from untrusted metadata block', () => {
    const text = "\n---\nSystem (untrusted metadata):\n```json\n{\n  \"project\": \"proj_456\"\n}\n```\n---\n";
    expect(extractProjectIdFromText(text)).toBe('proj_456');
  });

  it('extracts team from untrusted metadata block', () => {
    const text = "\n---\nContext (untrusted metadata):\n```json\n{\n  \"team\": \"platform\"\n}\n```\n---\n";
    expect(extractProjectIdFromText(text)).toBe('platform');
  });

  it('returns undefined if no metadata block', () => {
    expect(extractProjectIdFromText('hello world')).toBeUndefined();
  });

  it('returns undefined if json is invalid', () => {
    const text = "\n---\n(untrusted metadata):\n```json\n{ bad json }\n```\n---\n";
    expect(extractProjectIdFromText(text)).toBeUndefined();
  });
});
