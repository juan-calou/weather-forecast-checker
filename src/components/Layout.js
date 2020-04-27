import React from 'react';
import Navbar from './Navbar';

function Layout(props) {

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Navbar />
        <div className="container-fluid content">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
