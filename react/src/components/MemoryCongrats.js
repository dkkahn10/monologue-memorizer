import React from 'react';

const MemoryCongrats = props => {

  const greenString = {
    color: 'green',
  };

  return(
    <div className="container monologue-text-parts">
      <button className="back-monologue btn waves-effect waves-teal orange darken-3" onClick={props.memoryTesterClick}>
        {`Back To Your Monologue`}
      </button><br/>
      <input className="text-box" type="text" onChange={props.update}
      onKeyDown={props.handleSpacePress} />
      <p className="text-state" style={greenString}>{props.complete_memory}</p>
    </div>
  )
}

export default MemoryCongrats;
