import crypto from 'crypto';

/**
 * Get an encryption key for encrypting transactions
 *
 * @param {string} secretKey Flutterwave Secret Key
 * @returns {string} a 24 byte hash
 */
function deriveEncryptionKey(secretKey: string): string {
  // Generate a 32 byte MD5 hash
  const md5Hash = crypto
    .createHash('md5')
    .update(secretKey)
    .digest('hex');

  // Reduce the 32 byte hash to 12 bytes
  const md5HashLast12 = md5Hash.substr(-12);

  const strippedSecret = secretKey.replace('FLWSECK-', '');

  // Get the first 12 byes of the secret key
  const secretKeyFirst12 = strippedSecret.substr(0, 12);

  /**
   * Reduce the 256 bit hash to 192 bits
   * in a deterministic fashion so we can use 3DES.
   * Why not use AES and keep the 256 bit? ¯\_(ツ)_/¯
   */
  return secretKeyFirst12 + md5HashLast12;
}

/**
 * Encrypt a given payload with the supplied encryption key
 *
 * Uses 3DES encryption
 */
export function encrypt(secretKey: string, payload: string) {
  const encryptionKey = deriveEncryptionKey(secretKey);
  const cipher = crypto.createCipheriv('des-ede3', encryptionKey, '');
  const encrypted = cipher.update(payload, 'utf8', 'base64');

  return encrypted + cipher.final('base64');
}

export function generateIntegrityHash(secretKey: string, payload: any): string {
  const keys = Object.keys(payload).sort();

  const values = keys.reduce((list, key) => {
    if (key === 'integrity_hash') {
      return list;
    }

    return `${list}${payload[key]}`;
  }, '');

  const hashValue = `${values}${secretKey}`;

  return crypto
    .createHash('sha256')
    .update(hashValue, 'utf8')
    .digest('hex');
}
