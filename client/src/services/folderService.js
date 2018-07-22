import axios from "axios";

const FOLDER_URL = '/routes'

export class folderService {
  static queryForFolders() {
    return axios.get(`${FOLDER_URL}/`);
    // return axios.get(`${FOLDER_URL}/search/${query}`);
  }

  static createfolder(folder) {
    return axios.post(FOLDER_URL, folder);
  }

  static getFolderbyId(id) {
    return axios.get(`${FOLDER_URL}/${id}`);
  }

  
}
