import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "..";

var headers = {
  "X-Goog-FieldMask": "*",
  "Content-Type": "application/json",
  "X-Goog-Api-Key": API_KEY,
};

const NewNearByPlace = (data) =>
  axios.post(BASE_URL, data, { headers: headers });

export default {
  NewNearByPlace,
  API_KEY
};
