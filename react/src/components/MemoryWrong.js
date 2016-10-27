import React from 'react';

const MemoryWrong = props => {

  const redWord = {
    color: 'red',
  };

  return(
    <div className="container monologue-text-parts">
      <button className="back-monologue btn waves-effect waves-teal orange darken-3" onClick={props.memoryTesterClick}>
        {`Back To Your Monologue`}
      </button><br/>
      <input autoFocus className="text-box" type="text" value={props.memory} onChange={props.update}
      onKeyDown={props.handleSpacePress} />
      <p className="white-text text-state">{props.memory_string} <span style={redWord}>{props.wrong_word}</span></p>
    </div>
  )
}

export default MemoryWrong;
