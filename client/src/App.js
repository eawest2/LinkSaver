//----------
//Declare Imports
//----------

import React, { Component } from "react";
import "./App.css";
import api from './util/api'
import Folder from './components/folder/folder';
import InnactiveFolder from './components/innactiveFolder/innactiveFolder';
import Navbar from './components/navbar/navbar';
import User from './components/user/user';
import Login from './components/login/login';

//----------
//Define State
//----------
class App extends Component {
  state = {
    user: "",
    userID: "",
    userFolderList: [{ name: "1", _id: "1", description: "Test data in multiples of 1", links: [{ url: "1", name: "1" }, { url: "2", name: "2" }, { url: "3", name: "3" }] }, { name: "2", _id: "2", description: "Test data in multiples of 2", links: [{ url: "2", name: "2" }, { url: "4", name: "4" }, { url: "6", name: "6" }] }, { name: "3", _id: "3", description: "Test data in multiples of 3", links: [{ url: "3", name: "3" }, { url: "6", name: "6" }, { url: "9", name: "9" }] }],
    innactiveFolders: [{ name: "1", _id: "1", description: "Test data in multiples of 1", links: [{ url: "1", name: "1" }, { url: "2", name: "2" }, { url: "3", name: "3" }] }, { name: "2", _id: "2", description: "Test data in multiples of 2", links: [{ url: "2", name: "2" }, { url: "4", name: "4" }, { url: "6", name: "6" }] }, { name: "3", _id: "3", description: "Test data in multiples of 3", links: [{ url: "3", name: "3" }, { url: "6", name: "6" }, { url: "9", name: "9" }] }],
    activeFolders: [],
    newFolder: "default",
    newDescription: "default",
    newname: "default",
    newURL: "default",
    searchTerm: ""
  };

  //----------
  //Function Library
  //----------

  //Helper Functions
  //----------
  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  copy = (coppiedText) => {
    coppiedText.select();
    document.execCommand("copy");
  }

  //GUI Functions
  //----------
  setActiveFolder = (folderID, inputCase) => {

    let newActiveFolders;
    let newInnactiveFolders;
    const currentActive = this.state.activeFolders;
    const currentInnactive = this.state.innactiveFolders;

    switch (inputCase) {
      case "active":
        newActiveFolders = currentActive.filter(item => item._id !== folderID);
        newInnactiveFolders = currentInnactive.concat(currentActive.filter(item => item._id === folderID))
        break;

      case "innactive":
        newInnactiveFolders = currentInnactive.filter(item => item._id !== folderID);
        newActiveFolders = currentActive.concat(currentInnactive.filter(item => item._id === folderID))
        break;

      default:
    }
    this.setState({
      ...this.state,
      activeFolders: newActiveFolders,
      innactiveFolders: newInnactiveFolders
    });
  };

  //CRUD Functions
  //----------

  //User Functions
  //----------
  setUser = event => {
    let userAuthName;
    let userAuthID;

    //REQUIRE AUTENTICATION LOGIC HERE

    userAuthName = "Some Value For User Name"
    userAuthID = "Some Value For User ID"
    this.setState({
      ...this.state,
      user: userAuthName,
      userID: userAuthID
    });
  };

  logout = event => {
    this.setState({
      ...this.state,
      user: "",
      userID: ""
    });
  };

  //Folder Functions
  //----------
  addFolder = (userID) => {
    const name = this.state.newFolder;
    const Description = this.state.newDescription;
    const newFolder = { name: name, description: Description, links: [] };
    console.log(newFolder);

    api.createfolder(newFolder, userID);

    this.setState({
      ...this.state,
      newFolder: "",
      newDescription: "",
    });
  };

  deleteFolder = (folderID) => {
    //axios delete request to folder ID to remove user from user access.
    //must return new object for folder

    console.log(`Folder ID of ${folderID} to be deleted`);

    api.deleteFolder(folderID);
  };

  componentDidMount(){
  };


  //Link Functions
  //----------
  addLink = (folderID) => {
    const name = this.state.newname;
    const URL = this.state.newURL;
    const description = this.state.newDescription;
    const newLink = { folderID: folderID, name: name, url: URL, description: description };
    console.log(newLink);

    api.createLink(folderID, newLink);

    this.setState({
      ...this.state,
      newUrl: "",
      newDescription: "",
      newname: "",
    });
  };

  deleteLink = (folderID, linkUrl) => {
    //axios delete request to remove link from folder
    //must return new object for folder
    console.log(`Link of  Link URL: ${linkUrl} to be deleted from Folder ID of ${folderID}`)
    api.deleteLink(folderID, linkUrl);

  };

  //----------
  //Render Page
  //----------
  render() {
    if (this.state.user)
      return (
        <div className="bg-dark">
          <Navbar
            logout={this.logout}
          />
          <User
            userID={this.state.userID}
            addFolder={this.addFolder}
            handleInputChange={this.handleInputChange}
          >
            {this.state.activeFolders.map(folder => (
              <Folder
                key={folder._id}
                _id={folder._id}
                folderURL={`linksaver/folder/${folder._id}`}
                name={folder.name}
                links={folder.links}
                description={folder.description}
                handleInputChange={this.handleInputChange}
                setActiveFolder={this.setActiveFolder}
                deleteFolder={this.deleteFolder}
                deleteLink={this.deleteLink}
                copy={this.copy}
                addLink={this.addLink}
              />
            ))}
            {this.state.innactiveFolders.map(folder => (
              <InnactiveFolder
                key={folder._id}
                _id={folder._id}
                name={folder.name}
                description={folder.description}
                setActiveFolder={this.setActiveFolder}
                deleteFolder={this.deleteFolder}
              />
            ))}
          </User>
        </div>
      );

    else {
      return (
        <div>
          <Login
            handleInputChange={this.handleInputChange}
            setUser={this.setUser}
          />
        </div>
      );
    }
  }
}

export default App;