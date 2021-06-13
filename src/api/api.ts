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
    return axios.get(this.baseURL + "/task").then((res) => {
      return res.data;
    });
  };

  add = async (description: string): Promise<boolean> => {
    return axios.post(this.baseURL + "/task", {
      headers: { "Content-Type": "application/json" },
      data: { description },
    });
  };
}
