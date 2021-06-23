import axios from "axios";
import { Task } from "../models/task";

export class Api {
  protected baseURL: string;

  constructor(baseURL: string) {
    if (!baseURL) {
      throw Error("Base URL empty!");
    }
    this.baseURL = baseURL;
  }

  getAll = async (): Promise<Task[]> => {
    return axios.get(this.baseURL + "/tasks").then((res) => {
      return res.data;
    });
  };

  add = async (description: string): Promise<boolean> => {
    return axios.post(this.baseURL + "/tasks", {description});
  };

  patch = async (id: number, completed: boolean): Promise<boolean> => {
    return axios.patch(this.baseURL + "/tasks/" + id, {completed});
  };
}
