//----------
//Declare Imports
import React, { Component } from "react";
import "./App.css";
import api from "./util/api";
import NewFolder from './components/folder/NewFolder';
import Navbar from "./components/navbar/navbar";
import User from "./components/user/user";
import axios from "axios";
import Authentication from "./components/authentication/Authentication";

//--
import injectTapEventPlugin from "react-tap-event-plugin";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
// import HomePage from "./components/HomePage.jsx";
// import LoginPage from "./containers/LoginPage.jsx";
// import LogoutFunction from "./containers/LogoutFunction.jsx";
// import SignUpPage from "./containers/SignUpPage.jsx";
// import DashboardPage from "./containers/DashboardPage.jsx";
import Auth from "./modules/Auth";
import copy from 'copy-to-clipboard';

axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');



injectTapEventPlugin();




//----------
//Define State
class App extends Component {
  state = {
    user: "",
    userID: "",
    userFolderList: [],
    innactiveFolders: [],
    activeFolders: [],
    newFolder: "default",
    newDescription: "default",
    newURL: "default",
    searchTerm: "",
    authenticated: false,
    newLoginName: "",
    newLoginEmail: "",
    newPassword: "",
    newShared: "",
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

  copyText = (coppiedText) => {
    copy(coppiedText);
    console.log(coppiedText);
  };

  //GUI Functions
  //----------

  //---------
  // TODO: Move to utility file
  dynamicSort = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
  //----------

  openPanel = () => {
    this.setState({
      ...this.state,
      user: "new"
    });
  };

  collabFolder = () => {
    const sharedFolders = this.state.userFolderList.filter(item => (item.users[1]));
    this.setState({
      ...this.state,
      userFolderList: sharedFolders,
      InnactiveFolders: sharedFolders,
    });
  };
  //CRUD Functions
  //----------

  //Folder Functions
  //----------
  addFolder = () => {
    const Name = this.state.newFolder;
    const Description = this.state.newDescription;
    const userID = this.state.userID;
    if (this.state.newShared) {
      const newFolderID = this.state.newShared
      const newUserFolder = { folder_id: newFolderID, user_id: userID }
      api.addFolderToUser(newUserFolder).then(() => {
        this.setState({
          ...this.state,
          userFolderList: [],
          innactiveFolders: [],
        });
        api.getFolderbyUser(userID).then(response => {
          const userFolders = response.data.folders
          this.setState({
            ...this.state,
            userFolderList: userFolders,
            innactiveFolders: userFolders,
          });
        });
      });
    }
    else {
      const newFolder = { name: Name, description: Description };
      api.createfolder(newFolder).then((response) => {
        const newFolderID = response.data._id
        const newUserFolder = { folder_id: newFolderID, user_id: userID }
        api.addFolderToUser(newUserFolder).then(() => {
          this.setState({
            ...this.state,
            userFolderList: [],
            innactiveFolders: [],
          });
          api.getFolderbyUser(userID).then(response => {
            const userFolders = response.data.folders
            this.setState({
              ...this.state,
              userFolderList: userFolders,
              innactiveFolders: userFolders,
            });
          });
        });
      });
      this.setState({
        ...this.state,
        newFolder: "",
        newDescription: ""
      });
    };
  };

  deleteFolder = folderID => {
    console.log(`Folder ID of ${folderID} to be deleted`);
    const folderObj = { folder_id: folderID };
    api.deleteFolder(folderObj).then(() => {
      const userID = this.state.userID;
      this.setState({
        ...this.state,
        userFolderList: [],
        innactiveFolders: [],
        activeFolders: [],
      });
      api.getFolderbyUser(userID).then(response => {
        const userFolders = response.data.folders
        this.setState({
          ...this.state,
          userFolderList: userFolders,
          innactiveFolders: userFolders,
        });
      });
    });
  };

  deleteUserFolder = folderID => {
    console.log(`Folder ID of ${folderID} to be deleted`);
    const reqObj = { folder_id: folderID, user_id: this.state.userID };
    const userObj = { user_id: this.state.userID };
    api.deleteUserFolder(reqObj).then(() => {
      const userID = this.state.userID;
      this.setState({
        ...this.state,
        userFolderList: [],
        innactiveFolders: [],
        activeFolders: [],
      });
      api.getFolderbyUser(userID).then(response => {
        const userFolders = response.data.folders
        this.setState({
          ...this.state,
          userFolderList: userFolders,
          innactiveFolders: userFolders,
        });
      });
    });
  };


  //Link Functions
  //----------

  addLink = (folderID) => {
    const search = this.state.newname;
    const URL = this.state.newURL;
    const description = this.state.newDescription;
    const newLink = { url: URL, description: description, searchTerm: search, folder_id: folderID };
    api.createLink(newLink).then(() => {
      const userID = this.state.userID;
      this.setState({
        ...this.state,
        userFolderList: [],
        activeFolders: [],
        innactiveFolders: [],
      });
      api.getFolderbyUser(userID).then(response => {
        const userFolders = response.data.folders
        this.setState({
          ...this.state,
          userFolderList: userFolders,
          innactiveFolders: userFolders,
        });
      });
    });

    this.setState({
      ...this.state,
      newUrl: "",
      newDescription: "",
      newname: "",

    });
  };

  deleteLink = (folderID, linkUrl) => {
    const linkObj = { folder_id: folderID, url: linkUrl };
    console.log(linkObj);
    api.deleteLink(linkObj).then(() => {
      const userID = this.state.userID;
      this.setState({
        ...this.state,
        userFolderList: [],
        innactiveFolders: [],
        activeFolders: [],
      });
      api.getFolderbyUser(userID).then(response => {
        const userFolders = response.data.folders
        this.setState({
          ...this.state,
          userFolderList: userFolders,
          innactiveFolders: userFolders,
        });
      });
    });
  };

  //Auth Functions
  //----------

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  };

   toggleAuthenticateStatus() {
    console.log('>>>> toggleAuthenticatedStatus state: ', this.state);
    // check authenticated status and toggle state based on that
    this.setState({
      authenticated: Auth.isUserAuthenticated(),
      userID: localStorage.getItem("userID")
    });
    setTimeout(() => {
      const userID = this.state.userID;
      api.getFolderbyUser(userID).then(response => {
        const userFolders = response.data.folders
        this.setState({
          ...this.state,
          userFolderList: userFolders,
          innactiveFolders: userFolders,
        });
      });
    }, 250);
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      ...this.state,
      user: "",
      userID: "",
      userFolderList: [],
      innactiveFolders: [],
      activeFolders: [],
      newFolder: "default",
      newDescription: "default",
      newURL: "default",
      searchTerm: "",
    });
  };

  //----------
  //Render Page
  //----------
  render() {

    console.log('>>>>> JHKSDGJSDGJSJHKSD');
    if (this.state.authenticated)

      return (

        <div className="bg-dark">
          <Navbar
            logout={this.logout}
            collab={this.collabFolder}
          />
          <User
            userID={this.state.userID}
            addFolder={this.addFolder}
            handleInputChange={this.handleInputChange}
            newShared={this.state.newShared}
          >
            {this.state.userFolderList.map(folder => (
              <NewFolder
                key={folder._id}
                _id={folder._id}
                name={folder.name}
                links={folder.links}
                description={folder.description}
                handleInputChange={this.handleInputChange}
                setActiveFolder={this.setActiveFolder}
                deleteFolder={this.deleteUserFolder}
                deleteLink={this.deleteLink}
                copy={this.copyText}
                addLink={this.addLink}
              />
            ))}
          </User>
        </div>
      );

    else {
      return (
        <Authentication 
          authenticated = {this.state.authenticated}
          toggleAuthenticateStatus = {() => this.toggleAuthenticateStatus()}
        />
      );
    }
  }
}

export default App;
