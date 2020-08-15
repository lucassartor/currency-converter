import randomColor from 'randomcolor';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    const bgColor = randomColor();


  return (
      <div style={{backgroundColor: bgColor}} className="w-max">
        <Component {...pageProps} />
      </div>
  );

}

export default MyApp
