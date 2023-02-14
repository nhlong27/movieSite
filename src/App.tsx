import { Outlet, Link} from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className='w-screen h-screen'>
      {/*Header Nav begins */}
      <Link to='/'>Home</Link> */
      <Link to='discover'>Explore</Link>
      <Link to='profile'>Profile</Link>
      {/* Nav ends */}

      <Outlet />

      {/* Footer */}
    </div>
  );
}

export default App;
