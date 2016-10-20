import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      memory: "",
      monologue: null,
      upload: null
    }
  }

  update(screen_text) {
    this.setState({memory: screen_text.target.value})
  }

  getMonologueId() {
    $.ajax({
      url: `/monologues/${this.props.id}`,
      method: 'GET'
    })

    .done(data => {
      this.setState ({
        monologue: data.monologue,
        upload: data.response
      })
    })
  }

  componentDidMount() {
    this.getMonologueId();
  }

  render(){
    if (this.state.monologue !== null) {
      return(
        <div>
          <h1>{this.state.monologue.play_title}</h1>
          <h2>{this.state.monologue.character}</h2>
          <h2>{`Page Number: ${this.state.monologue.page_number}`}</h2>
          <h3>{this.state.monologue.genre}</h3>
          <p>{this.state.upload}</p>
        </div>
      );
    } else {
      return(
        <div> </div>
      )
    }
  }
}

export default App;
