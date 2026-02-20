import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../components/vendorSelect/styles.css';
import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import '../styles/index.css';
import { Editor } from '@adojs/editor';
import axios from 'axios';
import { isArray } from 'lodash';
import { allFonts } from '../config/constants';
function MyApp({ Component, pageProps }) {
  const getFonts = useCallback(async (query) => {
    const buildParams = (data) => {
      const params = new URLSearchParams();

      Object.entries(data).forEach(([key, value]) => {
        if (isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });

      return params;
    };

    let fontsByLido = allFonts;
    fontsByLido = fontsByLido.map((data) => {
      delete data._id;
      delete data.urls;
      const fonts = data.fonts.map((font) => {
        font.urls = [`/fonts/${data.name}.woff2`];
        return font;
      });
      data.fonts = fonts;
      return data;
    });
    // let updatedFonts = fontsByLido.map((data) => data.fonts[0].urls);
    // updatedFonts = updatedFonts.flat(Infinity);
    // console.log(
    //   `🚀 ~ file: _app.js:32 ~ getFonts ~ fontsByLido:`,
    //   updatedFonts
    // );
    console.log(`🚀 ~ file: _app.js:51 ~ getFonts ~ fontsByLido:`, fontsByLido);
    return fontsByLido;
  }, []);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  const router = useRouter();
  const [auth, setAuth] = useState();

  useEffect(() => {
    const auth = localStorage.getItem('wedcell');
    const role = JSON.parse(localStorage.getItem('role'));
    setAuth(auth);
    if (!auth) {
      router.push('/Login');
    }
    if (auth) {
      if (role.role === 'Designer') {
        router.push('/canva');
      }
      if (role.role === 'Blog') {
        router.push('/blog-writer');
      }
    }
  }, [auth]);

  return (
    <Editor
      config={{
        assetPath: './assets',
        frame: {
          defaultImage: {
            url: './assets/images/frame-placeholder.png',
            width: 1200,
            height: 800,
          },
        },
      }}
      getFonts={getFonts}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Editor>
  );
}

export default MyApp;
