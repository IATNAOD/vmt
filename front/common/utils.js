import axios from 'axios';
import { baseUrl } from './config';

axios.defaults.withCredentials = true;

export const subscribeForUpdates = async (token, actions) => {

  let response = await axios.get(`${baseUrl}pool/subscribe?token=${token}`)
    .catch(() => subscribeForUpdates(token, actions));

  if (!response) {
    subscribeForUpdates(token, actions)
  } else if (response.status == 502) {
    subscribeForUpdates(token, actions)
  } else if (response.status != 200) {
    subscribeForUpdates(token, actions)
  } else {

    if (response.data && response.data != 'close') {

      if (response.data.action == 'item-transfer') {
        actions.addItem(response.data)
      } else if (response.data.action == 'coins-transfer') {
        actions.addTransaction(response.data)
      } else if (response.data.action == 'friend-add') {
        actions.newFriend(response.data)
      } else if (response.data.action == 'friend-accept') {
        actions.confirmedFriend(response.data)
      } else if (response.data.action == 'friend-delete') {
        actions.deletedFriend(response.data)
      }

      subscribeForUpdates(token, actions)
    }

  }

}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const parseFullTime = (time) => {
  time = new Date(time);

  let date = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (date < 10) date = "0" + date;

  if (month < 10) month = "0" + month;

  if (hours < 10) hours = "0" + hours;

  if (minutes < 10) minutes = "0" + minutes;

  return `${date}.${month}.${year} ${hours}:${minutes}`;
}

export const parseDate = (time) => {
  time = new Date(time);

  let date = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  if (date < 10) date = "0" + date;

  if (month < 10) month = "0" + month;

  return `${date}.${month}.${year}`;
}