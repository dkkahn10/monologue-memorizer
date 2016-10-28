import React from 'react';

const Monologue = props => {

  return(
    <div className="container center-align monologue-parts">
      <h1 className="individual-monologue monologue-spacing">{props.play_title}</h1>
      <h2 className="monologue-spacing">{`By ${props.author}`}</h2>
      <h3 className="monologue-spacing">{props.character}</h3>
      <h3 className="monologue-spacing">{`Page Number: ${props.page_number}`}</h3>
      <h4 className="monologue-spacing">{props.genre}</h4>
      <br/>
      <hr/>
      <br/>
      <p className="monologue-spacing monologue-show-text">{props.upload}</p>
      <br/>
      <button className="btn waves-effect waves-teal light-blue accent-3" onClick={props.memoryTesterClick} >
        {`Test Your Memory!`}
      </button>
    </div>
  );
}

export default Monologue;
