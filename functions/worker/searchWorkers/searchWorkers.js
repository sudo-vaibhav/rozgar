const getPaginatedData = require("../../getPaginatedData/getPaginatedData");
const Worker = require("../../../models/Worker");

const searchWorkers = async (req, res) => {
  const { skill, page, pinCode } = req.query;
  console.log(req.query);
  const queryConditions = {};
  if (skill) {
    queryConditions.skill = skill;
  }
  if (pinCode) {
    queryConditions.pinCode = {
      $regex: "^" + pinCode.substr(0, 2),
    };
  }

  console.log(queryConditions);
  const data = await getPaginatedData(
    Worker,
    parseInt(page) || 1,
    5,
    "-__v -createdAt -updatedAt",
    queryConditions
  );
  return res.status(200).send(data);
};

module.exports = searchWorkers;
