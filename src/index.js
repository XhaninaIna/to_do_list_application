import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter basename="/landing">
      <Routes>
        <Route path="/" element={<p>Hello element</p>} />
        <Route path="/test" element={<p>Test page route</p>} />
        {/* router dinamik, aksesojme path blog dhe bejme render nje id blog specifik(slug qe eshte dinamike), blog_post_slug */}
        {/* tn marrim id dhe e bejme fetch */}
        <Route path="/blog" element={<p>Blog</p>} />
        <Route path="/blog/:slug" element={<p>Blog post</p>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
