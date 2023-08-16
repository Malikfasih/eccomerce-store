import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, description, keywords, author, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <div className="d-flex flex-column justify-content-between align-content-between">
        <div>
          <Header />
        </div>

        <div>
          <main style={{ minHeight: "70vh" }}>
            <Toaster />
            {children}
          </main>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Fasih",
};

export default Layout;
