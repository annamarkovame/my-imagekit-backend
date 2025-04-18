const ImageKit = require('imagekit');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log("ENV VARS", {
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "loaded" : "missing",
      urlEndpoint: process.env.IMAGEKIT_BASE_URL,
    });
    
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
      urlEndpoint: process.env.IMAGEKIT_BASE_URL || '',
    });

    const authParams = imagekit.getAuthenticationParameters();
    res.status(200).json({
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (err) {
    console.error('ImageKit error:', err);
    res.status(500).json({ error: 'ImageKit auth failed' });
  }
};
