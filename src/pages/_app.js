import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Basic Meta */}
        <title>Lucky Day - Dashboard</title>
        <meta name="description" content="Helping neighbors in need through direct micro-donations and community support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Open Graph / Facebook / LinkedIn / Slack */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luckyday.vercel.app/" />
        <meta property="og:title" content="Lucky Day - Dashboard" />
        <meta property="og:description" content="Helping neighbors in need through direct micro-donations and community support." />
        <meta property="og:image" content="https://luckyday.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Lucky Day" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lucky Day - Dashboard" />
        <meta name="twitter:description" content="Helping neighbors in need through direct micro-donations and community support." />
        <meta name="twitter:image" content="https://luckyday.vercel.app/og-image.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#16a34a" />
        
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
