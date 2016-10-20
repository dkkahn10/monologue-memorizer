import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      memory: "",
      mem_page: null,
      monologue: null,
      upload: null,
    }
    this.memoryTesterClick = this.memoryTesterClick.bind(this)
  }

  update(screen_text) {
    this.setState({memory: screen_text.target.value})
  }

  memoryTesterClick() {
    if(this.state.mem_page === null) {
      this.setState({mem_page: ""});
    } else {
      this.setState({mem_page: null})
    }
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
      if (this.state.mem_page !== null) {
        return(
          <div>
            <button onClick={this.memoryTesterClick}>
              {`Back To Your Monologue`}
            </button><br/>
            <input type="text"
              onChange={this.update.bind(this)} />
            <p>{this.state.memory}</p>
          </div>
        )
      } else {
        return(
          <div>
          <h1>{this.state.monologue.play_title}</h1>
          <h2>{this.state.monologue.character}</h2>
          <h2>{`Page Number: ${this.state.monologue.page_number}`}</h2>
          <h3>{this.state.monologue.genre}</h3>
          <p>{this.state.upload}</p>
          <button onClick={this.memoryTesterClick}>
            {`Test Your Memory!`}
          </button>
          </div>
        );
      }
    } else {
      return(
        <div> </div>
      )
    }
  }
}

export default App;
