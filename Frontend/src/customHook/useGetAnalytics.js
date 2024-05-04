const useGetAnalytics = (data,subjects,attendance) => {
    // Function to calculate average marks for each subject
    const calculateAverageMarks = (subjectName) => {
        let totalMarks = 0;
        let totalSubjects = 0;

        data.forEach((subject) => {
            if (subject.subject === subjectName) {
                // Determine total marks based on iseType
                const totalMarksForSubject = subject.iseType === 'ISE1' || subject.iseType === 'ISE2' ? 20 : 70;

                // Add marks to totalMarks
                totalMarks += subject.marksObtained;

                // Add total marks for the subject type
                totalMarks += totalMarksForSubject;

                // Increment total subjects
                totalSubjects++;
            }
        });

        // Calculate average marks for the subject
        const averageMarks = totalMarks / totalSubjects;

        return averageMarks;
    };

    // Create an array to store average marks for each subject
    const averageMarksArray = [];

    // Calculate average marks for each subject and store in the array
    subjects.forEach((subjectName) => {
        const averageMarks = calculateAverageMarks(subjectName);
        averageMarksArray.push({ subject: subjectName, averageMarks });
    });

    const analyse = []
    for (let i = 0; i < subjects.length; i++){
        let res = (averageMarksArray[i]?.averageMarks + attendance[i]) / 2
        analyse.push(res) 
    }
    return analyse
};

export default useGetAnalytics;