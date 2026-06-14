import crypto from 'crypto';

// Base64Url encoder/decoder helpers
function base64url(buf: Buffer): string {
  return buf.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64urlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - str.length % 4) % 4);
  return Buffer.from(base64, 'base64').toString('utf8');
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

/**
 * Verifies a token using the RS256 algorithm with a public RSA key.
 * Returns the decoded payload if valid, otherwise returns null.
 */
export function verifyRS256(token: string, publicKeyPem: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [headerStr, payloadStr, signatureStr] = parts;
    
    // Normalize signature base64url to standard base64 for decoding
    const base64Sig = signatureStr.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - signatureStr.length % 4) % 4);
    const signature = Buffer.from(base64Sig, 'base64');
    
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(`${headerStr}.${payloadStr}`);
    
    const isValid = verify.verify(publicKeyPem, signature);
    if (!isValid) return null;
    
    const payload = JSON.parse(base64urlDecode(payloadStr));
    
    // Check expiration if present
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (err) {
    console.error('RS256 verification error:', err);
    return null;
  }
}
