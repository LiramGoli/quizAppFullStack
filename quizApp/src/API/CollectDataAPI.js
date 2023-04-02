const axios = require("axios");

const Api_Uri = "http://192.168.1.194:5000/api/v1/riddle-collect";

const getAllRiddles = () => {
  try {
    fetch(Api_Uri)
      .then((res) => res.json())
      .then((json) => console.log(json));
  } catch (error) {
    console.log(error);
  }
};

const createUpdateRiddle = async (id, difficulty) => {
  try {
    const api = `${Api_Uri}/${id}/${difficulty}`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
};

const updateRiddle = async (
  id,
  solved = false,
  hints = false,
  answer = false
) => {
  try {
    const response = await fetch(Api_Uri + `/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        solved,
        hints,
        answer,
      }),
    });
    console.log(await response.json());
  } catch (error) {
    console.error(error);
  }
};


module.exports = { getAllRiddles, createUpdateRiddle, updateRiddle };
