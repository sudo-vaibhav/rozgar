const Worker = require("../../../models/Worker");
const skills = require("../../../constants/skills");
const saveWorker = async (
  sender,
  skillIndex,
  pinCode,
  district,
  organisationMemberBool = false
) => {
  return new Promise((resolve, reject) => {
    Worker.init()
      .then(() => {
        const worker = new Worker({
          mobile: sender,
          skill: skills[parseInt(skillIndex) - 1],
          pinCode,
          district,
          organisationMember: organisationMemberBool,
        });

        worker
          .save()
          .then((newUser) => {
            resolve({
              status: 200,
              payload: newUser,
            });
          })
          .catch((err) => {
            console.log("error occured while saving worker");
            const returnValue = {
              status: 400,
              payload: {
                message: "worker already registered",
              },
            };
            console.log(returnValue);
            resolve(returnValue);
          });
      })
      .catch((err) => {
        resolve({
          status: 500,
          payload: {
            message: "internal server error",
          },
        });
      });
  });
};

module.exports = saveWorker;
