import React from 'react';
import './Tile.scss';

function Tile({children}) {
  return (
    <div className="tile">
      <span>{children}</span>
    </div>
  );
}

export default Tile;
