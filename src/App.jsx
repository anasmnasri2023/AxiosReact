
import React,{ Suspense, useState } from 'react';
import './App.css'
import Events from './UseCase/Events';
import AddEvents from './UseCase/AddEvents';
import { Routes , Route ,Link} from 'react-router-dom';
import NavigationBar from './UseCase/NavigationBar';

function App() {
  

  return (
    <>
     {/* <Events /> */}
     {/* <ColorBox initialColor="red"  /> */}
     {/* <a href='/test/colorbox/oumeima/twin'>Colobox with ancer</a> */}
     {/* <Link to='/test/colorbox/oumeima/twin' reloadDocument>Colobox with Link</Link>
     <Suspense fallback={<p>Loading...</p>}>
     <Routes>
      <Route path="/test" > 
        <Route path="colorbox/:username/:classe" element={<ColorBox initialColor="red" />} />
        <Route  path="counter" element={<Counter step="5" />} />
      </Route>
      <Route path="*" element={<p>404 not found</p>} />
     </Routes>
     </Suspense> */}
     <React.Suspense fallback={<h1> Loading ...</h1>}>
      <NavigationBar />
      <Routes>
      <Route path="/events" element={<Events />} />
        <Route path="/addEvent" element={<AddEvents />} />
        <Route
          path="*"
          element={<img src="/images/notfound.jfif" width="100%" alt="Not Found" />}
        />
      </Routes>
    </React.Suspense>
    </>
  )
}

export default App
