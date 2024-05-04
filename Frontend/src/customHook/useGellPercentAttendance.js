const useGellPercentAttendance = (attendanceData) => {
  const calculatePresentPercentageBySubjects = (data) => {
    return data.reduce((percentages, item) => {
      if (item?.type !== "practical") {
        const { subject, isPresent } = item;
        percentages[subject] = percentages[subject] || { presentCount: 0, totalCount: 0 };
        if (isPresent) {
          percentages[subject].presentCount++;
        }
        percentages[subject].totalCount++;
      }
      return percentages;
    }, {});
  };


  const calculatePracticalPercent = (data) => {
    return data.reduce((percentages, item) => {
      if (item?.type === "practical") {
        const { subject, isPresent } = item;
        percentages[subject] = percentages[subject] || { presentCount: 0, totalCount: 0 };
        if (isPresent) {
          percentages[subject].presentCount++;
        }
        percentages[subject].totalCount++;
      }
      return percentages;
    }, {});
  }

  // Calculate present percentages
  if (!attendanceData) {
    return {};
  }
  const presentPercentages = calculatePresentPercentageBySubjects(attendanceData);
  const practicalPercentages = calculatePracticalPercent(attendanceData);

  // Add percentage to each record in attendanceData
  const presentPercentageBySubjectsPractical = {};
  for (const subject in practicalPercentages) {
    const { presentCount, totalCount } = practicalPercentages[subject];
    presentPercentageBySubjectsPractical[subject] = (presentCount / totalCount) * 100;
  }


  // Compute percentages
  const presentPercentageBySubjects = {};
  for (const subject in presentPercentages) {
    const { presentCount, totalCount } = presentPercentages[subject];
    presentPercentageBySubjects[subject] = (presentCount / totalCount) * 100;
  }
  console.log(presentPercentageBySubjects, presentPercentageBySubjectsPractical)
  return [presentPercentageBySubjects, presentPercentageBySubjectsPractical];
}

export default useGellPercentAttendance
