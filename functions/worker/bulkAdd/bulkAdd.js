const Organisation = require("../../../models/Organisation");
// const Worker = require("../../../models/Worker");
const addMultipleWorkers = require("../addMultipleWorkers/addMultipleWorkers");
const User = require("../../../models/User");
module.exports = async (req, res) => {
  console.log("body of request", req.body);
  const { workersInfo, organisationInfo, organisationId } = req.body;
  if (organisationId) {
    console.log("trying to update organisation and add more workers");
    const organisation = await Organisation.findById(organisationId);
    const addedWorkerIds = await addMultipleWorkers(workersInfo);
    console.log("added worker ids: ", addedWorkerIds);
    // addMultipleWorkers();
    await Organisation.findByIdAndUpdate(
      organisationId,
      {
        workers: [...organisation.workers, addedWorkerIds],
      },
      (err, organisationDoc) => {
        if (!err) {
          console.log("organisation updated=> ", organisationDoc);

          return res.status(200).send({
            message: "new workers added and organisation updated",
            data: organisationDoc,
          });
        }
      }
    );
  } else {
    //create new organisation
    const addedWorkerIds = await addMultipleWorkers(workersInfo);
    const leader = await User.findOne({
      userUUID: req.user.user_id,
    });
    const newOrganisation = new Organisation({
      name: organisationInfo.name,
      city: organisationInfo.city,
      domain: organisationInfo.domain,
      leaderId: leader._id,
      workers: addedWorkerIds,
    });
    await newOrganisation.save();

    return res.status(200).send({
      message: "New organisation created",
      data: newOrganisation,
    });
  }
  // console.log("mappings : ", pinCodeToDistrictMap);
};
