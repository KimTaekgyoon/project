import axios from "axios";

const FASTAPI_SERVER_IP = `${process.env.REACT_APP_FASTAPI_SERVER_IP}`;
const FASTAPI_SERVER_PORT = `${process.env.REACT_APP_FASTAPI_SERVER_PORT}`;
const FASTAPI_DEFAULT_URL = `${FASTAPI_SERVER_IP}:${FASTAPI_SERVER_PORT}`;

export const fastApiRequest = async (method, url, headers, data) => {
    return await axios({
        method,
        url: `${FASTAPI_DEFAULT_URL}${url}`,
        headers,
        data
    }).catch(error => console.log(error));
}
