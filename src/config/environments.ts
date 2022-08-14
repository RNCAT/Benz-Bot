const environments = {
  isProd: process.env.NODE_ENV === 'production',
  bitlyToken: process.env.BITLY_TOKEN || '',
  trnToken: process.env.TRN_TOKEN || '',
}

export default environments
