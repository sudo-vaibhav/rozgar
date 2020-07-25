const Worker = require("../../../models/Worker");
const skills = require("../../../constants/skills");
const saveWorker = (sender, skillIndex, pinCode, district) => {
  Worker.init()
    .then(() => {
      const worker = new Worker({
        mobile: sender,
        skill: skills[parseInt(skillIndex) - 1],
        pinCode: pinCode,
        district,
      });

      worker
        .save()
        .then((newUser) => {
          return {
            status: 200,
            payload: newUser,
          };
        })
        .catch((err) => {
          console.log("error occured while saving worker");
          return {
            status: 400,
            payload: {
              message: err.message,
            },
          };
        });
    })
    .catch((err) => {
      return {
        status: 500,
        payload: {
          message: "internal server error",
        },
      };
    });
};

module.exports = saveWorker;
