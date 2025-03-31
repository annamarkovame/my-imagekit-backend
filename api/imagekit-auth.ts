import { NextApiRequest, NextApiResponse } from 'next';
import ImageKit from 'imagekit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    // Initialize ImageKit with private credentials
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
      urlEndpoint: process.env.IMAGEKIT_BASE_URL || '',
    });
    // Generate authentication parameters
    const authParams = imagekit.getAuthenticationParameters();

    // Return the auth parameters to the client
    res.status(200).json(authParams);
  } catch (error) {
    console.error('ImageKit auth error:', error);
    res.status(500).json({ error: 'Failed to generate authentication parameters' });
  }
}
