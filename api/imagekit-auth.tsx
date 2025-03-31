import ImageKit from 'imagekit';
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(
  req: IncomingMessage & { method?: string },
  res: ServerResponse & { statusCode?: number; setHeader: Function; end: Function }
) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
      urlEndpoint: process.env.IMAGEKIT_BASE_URL || '',
    });

    const authParams = imagekit.getAuthenticationParameters();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(authParams));
  } catch (error) {
    console.error('ImageKit auth error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to generate authentication parameters' }));
  }
}
