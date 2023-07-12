import React from "react"

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
