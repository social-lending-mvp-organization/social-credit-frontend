import { ParallaxProvider } from 'react-scroll-parallax';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

ReactDOM.render(
  <ParallaxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ParallaxProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
