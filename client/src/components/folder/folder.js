import React, { Component } from "react";
import { folderService } from "../../services/folderService";

export class FolderPage extends Component {
  state = {
    folder: {
      name: "",
      description: ""
    },
    folders: []
  };

  componentDidMount() {
    this.getfolder();
  }

  getfolder() {
    folderService
      .queryForFolders()
    //   .then(res => this.setState({ folders: res.data }));
      .then(res => this.setState({ folders: res.data }));
  }


  render() {
    return (
      <div>
          {this.state.folders.map(folder => (
             <div>{folder.name}</div>
          ))}ç
      </div>
    );
  }
}