const AWS = require("aws-sdk");
const { v4 } = require("uuid");
const axios = require("axios");
const { transformDataPeople, validateKeys } = require("../utils");

const getPeopleId = async (req, res) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = req.params;
  const type = req.query?.type || 1;
  if (type == 1) {
    // for API START WARS
    try {
      const response = await axios.get(`https://swapi.py4e.com/api/people/${id}`);
      return res.status(200).json({
        success: true,
        people: transformDataPeople(response.data),
      });
    } catch (error) {
      console.log({ error });
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  }

  if (type == 2) {
    // for DYNAMODB
    try {
      const result = await dynamodb
        .get({
          TableName: "PeoplesTable",
          Key: {
            id,
          },
        })
        .promise();

      const people = result.Item;
      if (!people)
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      return res.status(200).json({
        success: true,
        people,
      });
    } catch (error) {
      console.log({ error });
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  }
};

const addPeople = async (req, res) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const data = req.body;
  const id = v4();
  const isValidObject = validateKeys(data);

  if (!isValidObject) {
    return res.status(400).json({
      success: false,
      message: "Data not found",
      details: {
        schema: {
          nombre: "",
          altura: "",
          peso: "",
          cabello_color: "",
          piel_color: "",
          ojos_color: "",
          nacimiento: "",
          genero: "",
        },
      },
    });
  }
  const newPeople = { ...data, id };
  await dynamodb
    .put({
      TableName: "PeoplesTable",
      Item: newPeople,
    })
    .promise();

  return res.status(200).json({
    success: true,
    people: newPeople,
  });
};

const getPeople = async (req, res) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const type = req.query?.type || 1;
  const page = req.query?.page || 1;

  if (type == 1) {
    // for API START WARS
    try {
      const response = await axios.get(`https://swapi.py4e.com/api/people?page=${page}`);

      return res.status(200).json({
        success: true,
        peoples: response.data.results.map((result) => transformDataPeople(result)),
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  }

  if (type == 2) {
    // for DYNAMODB
    const result = await dynamodb
      .scan({
        TableName: "PeoplesTable",
      })
      .promise();

    const peoples = result.Items;
    return res.status(200).json({
      success: true,
      peoples,
    });
  }
};

module.exports = {
  addPeople,
  getPeopleId,
  getPeople,
};
