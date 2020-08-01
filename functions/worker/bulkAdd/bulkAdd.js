const axios = require("axios");
const saveWorker = require("../saveWorker/saveWorker");

module.exports = async (req, res) => {
  console.log("body of request", req.body);
  const { workersInfo } = req.body;
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
    await saveWorker(
      worker.mobile,
      worker.skillIndex,
      worker.pinCode,
      pinCodeToDistrictMap[worker.pinCode],
      true
    );
  }
  // console.log("mappings : ", pinCodeToDistrictMap);

  return res.status(200).send({
    message: "bulk add operation carried out",
  });
};
