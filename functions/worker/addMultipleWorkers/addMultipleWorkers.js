const saveWorker = require("../saveWorker/saveWorker");
const axios = require("axios");

module.exports = async (workersInfo) => {
  return new Promise(async (resolve, reject) => {
    const addedWorkerIds = [];
    const distinctPinCodes = new Set();
    workersInfo.forEach((worker) => {
      distinctPinCodes.add(worker.pinCode);
    });
    const pinCodeToDistrictMap = {};

    console.log("distinct pin codes: ", distinctPinCodes);

    for await (const pinCode of distinctPinCodes) {
      let district = undefined;
      const resp = await axios.get(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );
      try {
        district = resp.data[0].PostOffice[0].District;
      } catch (err) {
        district = "";
      }
      pinCodeToDistrictMap[pinCode] = district;
    }

    for await (const worker of workersInfo) {
      console.log("trying to add ", worker);
      const savedData = await saveWorker(
        worker.mobile,
        worker.skillIndex,
        worker.pinCode,
        pinCodeToDistrictMap[worker.pinCode],
        true
      );
      if (savedData.status == 200) {
        console.log("added worker id: ", savedData.payload._id);
        addedWorkerIds.push(savedData.payload._id);
      }
    }

    resolve(addedWorkerIds);
  });
};
