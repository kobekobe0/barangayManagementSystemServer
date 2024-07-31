import CensusReport from "../../models/CensusReport.js";
import Resident from "../../models/Resident.js";
import Household from "../../models/Household.js";
import Family from "../../models/Family.js";


export const updateCensusReport = async (req, res) => {
    try {
        const censusReportArr = await CensusReport.find().exec();
        if (!censusReportArr.length) {
            return res.status(404).json({ message: "Census report not found" });
        }
        
        const dateNow = new Date();
        const year = dateNow.getFullYear();
        const month = dateNow.getMonth();
        const day = dateNow.getDate();
        
        const censusReport = censusReportArr[0];
        
        //check if census report last updated is not more than 30 mmins
        if (censusReport.lastUpdate) {
            const lastUpdated = new Date(censusReport.lastUpdate); // Ensure lastUpdate is a Date object
            const diffInMilliseconds = Date.now() - lastUpdated.getTime();
            const diffInMinutes = Math.floor(diffInMilliseconds / (100 * 50));
          
            if (diffInMinutes < 30) {
              return res.status(409).json({
                message: 'Census report was updated less than 30 minutes ago'
              });
            }
        }


        const residents = await Resident.find().exec(); // Fetch all residents
        const bulkWriteOperations = [];
        const ageGroups = {};
        
        residents.forEach(resident => {
            const birthDate = resident.dateOfBirth;
            const birthYear = birthDate.getFullYear();
            const birthMonth = birthDate.getMonth();
            const birthDay = birthDate.getDate();
        
            let age = year - birthYear;
            if (month < birthMonth || (month === birthMonth && day < birthDay)) {
                age--;
            }
        
            bulkWriteOperations.push({
                updateOne: {
                    filter: { _id: resident._id },
                    update: { $set: { age } }
                }
            });
        });
        
        // Perform bulk write operations
        await Resident.bulkWrite(bulkWriteOperations);

        //update the census report
        censusReport.totalPopulation = residents.length;
        const counts = await Promise.all([
            Resident.countDocuments({ sex: 'M' }),
            Resident.countDocuments({ sex: 'F' }),
            Resident.countDocuments({ sector: 'pwd' }),
            Resident.countDocuments({ sector: 'senior' }),
            Resident.countDocuments({ sector: 'solo' }),
            Resident.countDocuments({ sector: 'ofw' }),
            Resident.countDocuments({ educationalAttainment: 'elementary' }),
            Resident.countDocuments({ educationalAttainment: 'highschool' }),
            Resident.countDocuments({ educationalAttainment: 'undergraduate' }),
            Resident.countDocuments({ educationalAttainment: 'doctorate' }),
            Resident.countDocuments({ educationalAttainment: 'vocational' }),
            Resident.countDocuments({ educationalAttainment: 'masteral' }),
            Resident.countDocuments({ educationalAttainment: null }),
            Resident.countDocuments({ p4: true }),
            Household.countDocuments(),
            Family.countDocuments(),
            Resident.countDocuments({ age: { $gte: 0, $lte: 4 } }),
            Resident.countDocuments({ age: { $gte: 5, $lte: 9 } }),
            Resident.countDocuments({ age: { $gte: 10, $lte: 14 } }),
            Resident.countDocuments({ age: { $gte: 15, $lte: 19 } }),
            Resident.countDocuments({ age: { $gte: 20, $lte: 24 } }),
            Resident.countDocuments({ age: { $gte: 25, $lte: 29 } }),
            Resident.countDocuments({ age: { $gte: 30, $lte: 34 } }),
            Resident.countDocuments({ age: { $gte: 35, $lte: 39 } }),
            Resident.countDocuments({ age: { $gte: 40, $lte: 44 } }),
            Resident.countDocuments({ age: { $gte: 45, $lte: 49 } }),
            Resident.countDocuments({ age: { $gte: 50, $lte: 54 } }),
            Resident.countDocuments({ age: { $gte: 55, $lte: 59 } }),
            Resident.countDocuments({ age: { $gte: 60, $lte: 64 } }),
            Resident.countDocuments({ age: { $gte: 65, $lte: 69 } }),
            Resident.countDocuments({ age: { $gte: 70, $lte: 74 } }),
            Resident.countDocuments({ age: { $gte: 75, $lte: 79 } }),
            Resident.countDocuments({ age: { $gte: 80, $lte: 999 } })
        ]);

        censusReport.male = counts[0];
        censusReport.female = counts[1];
        censusReport.pwd = counts[2];
        censusReport.senior = counts[3];
        censusReport.soloParent = counts[4];
        censusReport.ofw = counts[5];
        censusReport.elementary = counts[6];
        censusReport.highSchool = counts[7];
        censusReport.undergraduate = counts[8];
        censusReport.doctorate = counts[9];
        censusReport.vocational = counts[10];
        censusReport.masteral = counts[11];
        censusReport.noEducationalAttainment = counts[12];
        censusReport.p4 = counts[13];
        censusReport.totalHouseholds = counts[14];
        censusReport.totalFamilies = counts[15];
        censusReport.ageGroup = {
            under5: counts[16],
            fiveToNine: counts[17],
            tenToFourteen: counts[18],
            fifteenToNineteen: counts[19],
            twentyToTwentyFour: counts[20],
            twentyFiveToTwentyNine: counts[21],
            thirtyToThirtyFour: counts[22],
            thirtyFiveToThirtyNine: counts[23],
            fortyToFortyFour: counts[24],
            fortyFiveToFortyNine: counts[25],
            fiftyToFiftyFour: counts[26],
            fiftyFiveToFiftyNine: counts[27],
            sixtyToSixtyFour: counts[28],
            sixtyFiveToSixtyNine: counts[29],
            seventyToSeventyFour: counts[30],
            seventyFiveToSeventyNine: counts[31],
            eightyAbove: counts[32]
        };

        censusReport.lastUpdate = new Date();

        await censusReport.save();

        return res.status(200).json({
            message: "Census report updated",
            data: censusReport
        });

    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update census report",
            function: "updateCensusReport"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to update census report"
        });
    }
}