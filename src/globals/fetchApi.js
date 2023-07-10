import axios from "axios";

export async function fetchApiGet(url, params, accessToken = "") {
  try {
    let q = "";
    if (params) {
      q = convertToParams(params);
    }

    let config = {};
    if (accessToken) {
      config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
          "content-type": "application/json"
        },
      };
    }
    const request = await axios.get(
      `${process.env.REACT_APP_API_URL}${url}${q ? "?" + q : ""}`,
      config
    );
    if (request && request.status === 200) {
      return request.data;
    } else {
      return request;
    }
  } catch (e) {
    return e;
  }
}

export async function fetchApiPut(url, token, data, params = "") {
  try {
    let q = "";
    if (params) {
      q = convertToParams(params);
    }
    const request = await axios.put(
      `${process.env.REACT_APP_API_URL}${url}${q ? "?" + q : ""}`,
      data,
      { headers: { Authorization: "Bearer " + token } }
    );
    if (request && request.status === 200) {
      return request.data;
    } else {
      return request;
    }
  } catch (e) {
    return e;
  }
}

export async function fetchApiPost(url, token, data, params = "") {
  try {
    let q = "";
    if (params) {
      q = convertToParams(params);
    }
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}${url}${q ? "?" + q : ""}`,
      data,
      { headers: { Authorization: "Bearer " + token } }
    );
    if (request && request.status === 200) {
      return request.data;
    } else {
      return request;
    }
  } catch (e) {
    return e;
  }
}

export async function fetchApiDelete(url, token) {
  try {
    const request = await axios.delete(
      `${process.env.REACT_APP_API_URL}${url}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (request && request.status === 200) {
      return request.data;
    } else {
      return request;
    }
  } catch (e) {
    return e;
  }
}

export const convertToParams = (params) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== "" && params[key] !== undefined  && params[key] !== 0) searchParams.append(key, params[key]);
  });

  return searchParams;
};
