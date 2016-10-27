import React, { Component } from 'react';
import MemoryWrong from './MemoryWrong';
import MemoryCongrats from './MemoryCongrats';
import MemoryType from './MemoryType';

class MonologueLogic extends Component {
  constructor(props){
    super(props);
    this.state = {
      memory: "",
      upload_array: "",
      memory_array: "",
      memory_string: "",
      complete_memory: "",
      wrong_word: "",
      progression: true,
      congratulations: false
    }
    this.handleSpacePress = this.handleSpacePress.bind(this);
    this.update = this.update.bind(this);
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
    let upload = props.upload;
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

  render(){
    let progression = this.state.progression;
    let memoryTesterClick = props.memoryTesterClick;
    let congratulations = this.state.congratulations;
    let update = this.update;
    let handleSpacePress = this.handleSpacePress;
    let memory_string = this.state.memory_string;
    let wrong_word = this.state.wrong_word;
    let complete_memory = this.state.complete_memory;
    let memory = this.state.memory;

    if (progression === false) {
      return(
        <MemoryWrong
          memoryTesterClick={memoryTesterClick}
          update={update}
          handleSpacePress={handleSpacePress}
          memory_string={memory_string}
          wrong_word={wrong_word}
        />
      )
    } else if (congraulations === true) {
      return(
        <MemoryCongrats
          memoryTesterClick={memoryTesterClick}
          update={update}
          handleSpacePress={handleSpacePress}
          complete_memory={complete_memory}
        />
      )
    } else {
      return(
        <MemoryType
          memoryTesterClick={memoryTesterClick}
          update={update}
          handleSpacePress={handleSpacePress}
          memory={memory}
        />
      )
    }
  }
}

export default MemoryLogic;
