import axios from 'axios';
import { baseUrl } from '../config';

axios.defaults.withCredentials = true;

export default class UserApi {
  static getAllDataSets = () => axios.get(`${baseUrl}datasets/`);
}