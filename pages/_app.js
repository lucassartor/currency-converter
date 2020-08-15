import randomColor from 'randomcolor';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const color = randomColor();
  console.log(color);
  return (
      <div style={{backgroundColor: color}}>
        <Component {...pageProps} />
      </div>
  );

}

export default MyApp
