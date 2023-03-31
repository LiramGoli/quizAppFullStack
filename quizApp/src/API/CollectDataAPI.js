const axios = require("axios");

const Api_Uri = "https://localhost:5000/api/v1/riddle-collect";

const getAllRiddles = async () => {
  console.log("$%^$%^$^%$^%$^%$^%^$%");
  try {
    fetch("http://localhost:5000/api/v1/riddle-collect")
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
    axios
      .patch(Api_Uri + `/${id}`, {
        solved,
        hints,
        answer,
      })
      .then((response) => console.log(response));
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllRiddles, createUpdateRiddle, updateRiddle };
