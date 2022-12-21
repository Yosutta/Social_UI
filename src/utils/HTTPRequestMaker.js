import axios from "axios";

const defaultHeader = {
  "Content-Type": "application/json",
};

async function HTTPRequestMaker(
  method = "GET",
  route = "/",
  data = {},
  headers = defaultHeader,
  url = `${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}`
) {
  try {
    const requestUrl = url + route;
    const response = await axios({
      method,
      url: requestUrl,
      headers,
      data,
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

export default HTTPRequestMaker;
