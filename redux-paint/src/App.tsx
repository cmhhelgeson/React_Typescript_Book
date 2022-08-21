import React from 'react';

function App() {
  return (
    <div className="window">
      <div className='title-bar'>
        <div className='title-bar-text' style={{"margin": "0.25rem"}}>Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
    </div> 
  );
}

export default App;
