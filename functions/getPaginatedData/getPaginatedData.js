const getPaginatedData = async (
  Model,
  pageNumber = 1,
  perPageLimit = 10,
  shareableDocConfig = "",
  queryConditions = {}
) => {
  const paginatedDataInfo = {};

  // we will return total page count only for the first
  // page query instead of double scanning for each query
  // a smart optimisation suggested by @NavdeepChawla
  // if (pageNumber == 1) {
  paginatedDataInfo.totalCount = Math.ceil(
    await Model.find(queryConditions).count()
    // / perPageLimit
  );
  // }

  paginatedDataInfo.documents = await Model.find(queryConditions)
    .select(shareableDocConfig)
    .limit(perPageLimit)
    .skip((pageNumber - 1) * perPageLimit)
    .lean();

  return paginatedDataInfo;
};

module.exports = getPaginatedData;
