import axios from "axios";

const baseURL = '/api/folders/'

axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token');


export default {


    //----------
    //Get
    //----------
    getFolderbyId: function (id) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.get(`${baseURL}${id}`);
    },
    getFolderbyUser: function (userID) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.get(`${baseURL}returnUserFolders/${userID}`);
    },
    //----------
    //Post
    //----------
    createfolder: function (folderObj) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.post(`${baseURL}createFolder/`, folderObj);
    },
    addFolderToUser: function (userFolderObj) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.post(`${baseURL}addFolderToUser/`, userFolderObj);
    },
    createLink: function (linkObj) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.post(`${baseURL}addLink/`, linkObj);
    },
    deleteFolder: function (folderID, folderObj) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.post(`${baseURL}deleteFolder/${folderID}`, folderObj);
    },

    deleteUserFolder: function (reqObj) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.post(`${baseURL}deleteUserFolder/`, reqObj);
    },
    //----------
    //Delete
    //----------
    deleteLink: function (linkURL) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        return axios.post(`${baseURL}deletelink/`, linkURL);
    },

}
