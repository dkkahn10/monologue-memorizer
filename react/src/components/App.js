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
      complete_memory: "",
      wrong_word: "",
      progression: true,
      congratulations: false
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
      this.completeMemory();
    });
  }

  completeMemory() {
    let memory = this.state.memory;
    if(this.state.congratulations === false){
      this.setState({complete_memory: memory}, function afterMemoryString() {
        this.memoryString();
      });
    } else {
      this.memoryString();
    }
  }

  memoryString() {
    let memory = this.state.memory;
    if(this.state.progression === true) {
      memory = memory.split(" ");
      memory.pop();
      memory = memory.join().replace(/,/g, " ");
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
        this.congratulationsReset();
      });
    } else {
      this.congratulationsReset();
    }
  }

  congratulationsReset() {
    this.setState({congratulations: false}, function afterCongratulationsReset() {
      this.spacePressLogic();
    })
  }

  spacePressLogic() {
    let wrongArray = [];
    let wrongWord = "";
    let upload_array = this.state.upload_array;
    let memory_array = this.state.memory_array;
    for(let i = 0; i <= upload_array.length + 1; i++) {
      if (upload_array[i] != memory_array[i]) {
        wrongArray.push(memory_array[i]);
        if (wrongArray[0] != undefined) {
          wrongWord = wrongArray[0];
          break;
        }
      }
    }
    if(wrongArray[0] != undefined) {
      this.setState({wrong_word: wrongWord}, function afterSpacePressLogic(){
        this.progressionSetter();
      });
    }
    if(wrongArray[0] == undefined && upload_array.length == memory_array.length){
      this.setState({congratulations: true}, function afterSpacePressLogic() {
        alert ("Way to go! You are a memorization master!");
      })
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
            <div className="container monologue-text-parts">
              <button className="back-monologue btn waves-effect waves-teal orange darken-3" onClick={this.memoryTesterClick}>
                {`Back To Your Monologue`}
              </button><br/>
              <input className="text-box" type="text" onChange={this.update.bind(this)}
              onKeyDown={this.handleSpacePress} />
              <p className="white-text text-state">{this.state.memory_string} <span style={redWord}>{this.state.wrong_word}</span></p>
            </div>
          )
        } else if(this.state.congratulations === true) {
          const greenString = {
            color: 'green',
          };
          return(
            <div className="container monologue-text-parts">
              <button className="back-monologue btn waves-effect waves-teal orange darken-3" onClick={this.memoryTesterClick}>
                {`Back To Your Monologue`}
              </button><br/>
              <input className="text-box" type="text" onChange={this.update.bind(this)}
              onKeyDown={this.handleSpacePress} />
              <p className="text-state" style={greenString}>{this.state.complete_memory}</p>
            </div>
          )
        } else {
          return(
            <div className="container monologue-text-parts">
              <button className="back-monologue btn waves-effect waves-teal orange darken-3" onClick={this.memoryTesterClick}>
                {`Back To Your Monologue`}
              </button><br/>
                <input className="text-box" type="text"
                onChange={this.update.bind(this)} onKeyDown={this.handleSpacePress} />
              <p className="white-text text-state">{this.state.memory}</p>
            </div>
          )
        }
      } else {
        return(
          <div className="container center-align monologue-parts">
            <h1 className="individual-monologue monologue-spacing">{this.state.monologue.play_title}</h1>
            <h2 className="monologue-spacing">{`By  ${this.state.monologue.author}`}</h2>
            <h3 className="monologue-spacing">{this.state.monologue.character}</h3>
            <h3 className="monologue-spacing">{`Page Number: ${this.state.monologue.page_number}`}</h3>
            <h4 className="monologue-spacing">{this.state.monologue.genre}</h4>
            <br/>
            <p className="monologue-spacing">{this.state.upload}</p>
            <br/>
            <button className="btn waves-effect waves-teal light-blue accent-3" onClick={this.memoryTesterClick} >
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
