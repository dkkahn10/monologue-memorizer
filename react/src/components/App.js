import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      memory: "",
      mem_page: null,
      monologue: null,
      upload: null,
      upload_array: "",
      memory_array: "",
      memory_string: "",
      progression: true,
      wrong_word: ""
    }
    this.memoryTesterClick = this.memoryTesterClick.bind(this);
    this.handleSpacePress = this.handleSpacePress.bind(this);
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

  memoryTesterClick() {
    if(this.state.mem_page === null) {
      this.setState({mem_page: ""});
    } else {
      this.setState({mem_page: null})
    }
  }

  update(screen_text) {
    this.setState({memory: screen_text.target.value})
  }

  handleSpacePress(event) {
    if(event.keyCode == 32) {
      this.uploadArray();
    }
  }

  uploadArray() {
    let upload = this.state.upload;
    let uploadArray = upload.replace(/[.,\/#!$@%\^&\*;:{}=\-_`~()]/g, "");
    uploadArray = uploadArray.replace(/\s{2,}/g, " ");
    uploadArray = uploadArray.toLowerCase();
    uploadArray = uploadArray.split(" ");
    this.setState({upload_array: uploadArray}, function afterUploadArray() {
      this.memoryArray();
    });
  }

  memoryArray() {
    let memory = this.state.memory;
    let memoryArray = memory.replace(/[.,\/#!$@%\^&\*;:{}=\-_`~()]/g, "");
    memoryArray = memoryArray.replace(/\s{2,}/g, " ");
    memoryArray = memoryArray.toLowerCase();
    memoryArray = memoryArray.split(" ");
    this.setState({memory_array: memoryArray}, function afterMemoryArray() {
      this.memoryString();
    });
  }

  memoryString() {
    let memory = this.state.memory;
    memory = memory.split(" ");
    memory.pop();
    memory = memory.join().replace(/,/g, " ");
    if(this.state.progression === true) {
      this.setState({memory_string: memory}, function afterMemoryString() {
        this.wrongWordReset();
      });
    } else {
      this.wrongWordReset();
    }
  }

  wrongWordReset() {
    if(this.state.wrong_word !== "") {
      this.setState({wrong_word: ""}, function afterWrongWordReset() {
        this.progressionReset();
      });
    } else {
      this.progressionReset();
    }
  }

  progressionReset() {
    if(this.state.progression === false) {
      this.setState({progression: true}, function afterProgressionReset() {
        this.spacePressLogic();
      });
    } else {
      this.spacePressLogic();
    }
  }

  spacePressLogic() {
    let wrongArray = [];
    let wrongWord = "";
    for(let i = 0; i < this.state.upload_array.length; i++) {
      if (this.state.upload_array[i] != this.state.memory_array[i]) {
        wrongArray.push(this.state.memory_array[i]);
        if (wrongArray[0] != undefined) {
          wrongWord = wrongArray[0];
          break;
        }
      }
    }
    if (wrongArray[0] != undefined) {
      this.setState({wrong_word: wrongWord}, function afterSpacePressLogic(){
        this.progressionSetter();
      });
    }
  }

  progressionSetter() {
    this.setState({progression: false}, function afterProgressionSetter() {

    });
  }

  componentDidMount() {
    this.getMonologueId();
  }

  render(){
    if (this.state.monologue !== null) {
      if (this.state.mem_page !== null) {
        if(this.state.progression === false) {
          const redWord = {
            color: 'red',
          };
          return(
            <div>
              <button onClick={this.memoryTesterClick}>
                {`Back To Your Monologue`}
              </button><br/>
              <input type="text" onChange={this.update.bind(this)}
              onKeyDown={this.handleSpacePress} />
              <p>{this.state.memory_string} <span style={redWord}>{this.state.wrong_word}</span></p>
            </div>
          )
        } else {
          return(
            <div>
              <button onClick={this.memoryTesterClick}>
                {`Back To Your Monologue`}
              </button><br/>
                <input type="text"
                onChange={this.update.bind(this)} onKeyDown={this.handleSpacePress} />
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
