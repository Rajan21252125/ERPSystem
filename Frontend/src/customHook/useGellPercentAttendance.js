const useGellPercentAttendance = (attendanceData) => {
    const calculatePresentPercentageBySubjects = (data) => {
        return data.reduce((percentages, item) => {
          const { subject, isPresent } = item;
          percentages[subject] = percentages[subject] || { presentCount: 0, totalCount: 0 };
          if (isPresent) {
            percentages[subject].presentCount++;
          }
          percentages[subject].totalCount++;
          return percentages;
        }, {});
      };
      
      // Calculate present percentages
      if (!attendanceData) {
        return {};
      }
      const presentPercentages = calculatePresentPercentageBySubjects(attendanceData);
      
      // Compute percentages
      const presentPercentageBySubjects = {};
      for (const subject in presentPercentages) {
        const { presentCount, totalCount } = presentPercentages[subject];
        presentPercentageBySubjects[subject] = (presentCount / totalCount) * 100;
      }
      
    return presentPercentageBySubjects;
}

export default useGellPercentAttendance
