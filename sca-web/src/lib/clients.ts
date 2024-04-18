import axios from "axios";
import { initialize } from "./react-query";

export const http = axios.create({
  baseURL: 'http://localhost:8080',
});

export const reactQuery = initialize(http);

