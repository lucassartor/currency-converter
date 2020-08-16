import randomColor from 'randomcolor';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    const bgColor = randomColor();

    return (
        <div style={{backgroundColor: bgColor, body: 0, fontFamily: "Open Sans"}}>
            <Component {...pageProps} />
        </div>
    );

}

async function getInitialProps() {
    const bgColor = randomColor();

    return { bgColor };
}

MyApp.getInitialProps = getInitialProps;

export default MyApp
