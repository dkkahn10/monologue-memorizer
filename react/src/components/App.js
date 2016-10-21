import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      memory: "",
      mem_page: null,
      monologue: null,
      upload: null,
      upload_array: null,
      memory_array: null,
      progression: true,
      wrong_word: ""
    }
    this.memoryTesterClick = this.memoryTesterClick.bind(this);
    this.handleSpacePress = this.handleSpacePress.bind(this);
  }

  update(screen_text) {
    this.setState({memory: screen_text.target.value})
  }

  uploadArray() {
    let upload = this.state.upload;
    let uploadArray = upload.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    uploadArray = uploadArray.replace(/\s{2,}/g, " ");
    uploadArray = uploadArray.toLowerCase();
    uploadArray = uploadArray.split(" ");
    this.setState({upload_array: uploadArray});
  }

  memoryArray() {
    let memory = this.state.memory;
    let memoryArray = memory.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    memoryArray = memoryArray.replace(/\s{2,}/g, " ");
    memoryArray = memoryArray.toLowerCase();
    memoryArray = memoryArray.split(" ");
    this.setState({memory_array: memoryArray});
  }

  uniqueMaker(array) {
    return Array.from(new Set(array));
  }

  wrongWordReset() {
    if(this.state.wrong_word !== "") {
      this.setState({wrong_word: ""});
    }
  }

  progressionReset() {
    if(this.state.progression === false) {
      this.setState({progression: true});
    }
  }

  handleSpacePress() {
    this.uploadArray();
    this.memoryArray();
    this.wrongWordReset();
    this.progressionReset();
    let correctArray = [];
    let uniqueArray = null;
    if(event.keyCode == "Space") {
      for (let word of this.state.upload_array) {
        for (let mem of this.state.memory_array) {
          if(word === mem) {
            correctArray.push(word);
            break;
          }
        }
      }
      uniqueArray = uniqueMaker(correctArray);
      if(uniqueArray.length !== this.state.memory_array.length) {
        let wrongWord = "";
        wrongWord = this.state.memory_array.pop();
        this.setState({wrong_word: wrongWord});
        this.setState({progression: false});
      }
    }
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
        if(this.state.progression === false) {
          return(
            <div>
              <button onClick={this.memoryTesterClick}>
                {`Back To Your Monologue`}
              </button><br/>
              <input type="text"
              onKeyPress={this.handleSpacePress} />
              <p>{this.state.memory}</p>
            </div>
          )
        } else {
          return(
            <div>
              <button onClick={this.memoryTesterClick}>
                {`Back To Your Monologue`}
              </button><br/>
                <input type="text"
                onChange={this.update.bind(this)} onKeyPress={this.handleSpacePress} />
              <p>{this.state.memory}</p>
            </div>
          )
        }
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
