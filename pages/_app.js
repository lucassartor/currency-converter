import randomColor from 'randomcolor';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (

        <Component {...pageProps} />

  );

}

async function getInitialProps() {
    const bgColor = randomColor();

    return { bgColor };
}

MyApp.getInitialProps = getInitialProps;

export default MyApp
