import crypto from 'crypto';

// Base64Url encoder helper
function base64url(buf: Buffer): string {
  return buf.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Signs a payload using the RS256 algorithm with a private RSA key.
 */
export function signRS256(payload: any, privateKeyPem: string): string {
  const header = { alg: 'RS256', typ: 'JWT' };
  const headerStr = base64url(Buffer.from(JSON.stringify(header)));
  const payloadStr = base64url(Buffer.from(JSON.stringify(payload)));
  
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${headerStr}.${payloadStr}`);
  const signature = sign.sign(privateKeyPem);
  
  return `${headerStr}.${payloadStr}.${base64url(signature)}`;
}
