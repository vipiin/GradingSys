import React from 'react';
import Mainblock from './Components/mainblock';
import ReactDOM from 'react-dom/client';
import './index.css';
import Try from './Components/try';
import Footer from './Components/footer';
import Logo from './Components/logo';
import reportWebVitals from './reportWebVitals';
import Header from './Components/header';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <Logo/>
    <Header/>
    <Try/>
    <Mainblock/>
    <Footer/>
  </>
  // </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
