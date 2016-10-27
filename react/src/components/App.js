import React, { Component } from 'react';
import Monologue from './Monologue';
import MemoryLogic from './MemoryLogic';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mem_page: null,
      monologue: null,
      upload: null
    }
    this.memoryTesterClick = this.memoryTesterClick.bind(this);
  }

  getMonologueId() {
    $.ajax({
      url: `/monologues/${this.props.id}`,
      method: 'GET'
    })

    .done(data => {
      this.setState ({
        monologue: data.monologue,
        upload: data.response.replace(/\r?\n|\r/g, "")
      })
    })
  }

  memoryTesterClick() {
    if(this.state.mem_page === null) {
      this.setState({mem_page: ""});
    } else {
      this.setState({mem_page: null})
    }
  }

  componentDidMount() {
    this.getMonologueId();
  }

  render(){
    let monologue = this.state.monologue;
    let mem_page = this.state.mem_page;
    let upload = this.state.upload;
    let memoryTesterClick = this.memoryTesterClick;

    if (monologue !== null) {
      if (mem_page !== null) {
        return (
          <MemoryLogic
            upload={upload}
            memoryTesterClick={memoryTesterClick}
          />
        )
      } else {
        return (
          <Monologue
            play_title={monologue.play_title}
            author={monologue.author}
            character={monologue.character}
            page_number={monologue.page_number}
            genre={monologue.genre}
            upload={upload}
            memoryTesterClick={memoryTesterClick}
          />
        )
      }
    } else {
      return(
        <div> </div>
      )
    }
  }
}

export default App;
