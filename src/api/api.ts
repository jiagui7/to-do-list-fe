import axios from "axios";

export class Api {
  protected baseURL: string;

  constructor(baseURL: string) {
    if (!baseURL) {
      throw Error("Base URL empty!");
    }
    this.baseURL = baseURL;
  }

  getAll = async () => {
    return axios.get(this.baseURL + "/task");
  };
}
