import { Schema } from "mongoose";

const ageGroupSchema = new Schema({
    under5: {
        type: Number,
        default: 0
    },
    fiveToNine: {
        type: Number,
        default: 0
    },
    tenToFourteen: {
        type: Number,
        default: 0
    },
    fifteenToNineteen: {
        type: Number,
        default: 0
    },
    twentyToTwentyFour: {
        type: Number,
        default: 0
    },
    twentyFiveToTwentyNine: {
        type: Number,
        default: 0
    },
    thirtyToThirtyFour: {
        type: Number,
        default: 0
    },
    thirtyFiveToThirtyNine: {
        type: Number,
        default: 0
    },
    fortyToFortyFour: {
        type: Number,
        default: 0
    },
    fortyFiveToFortyNine: {
        type: Number,
        default: 0
    },
    fiftyToFiftyFour: {
        type: Number,
        default: 0
    },
    fiftyFiveToFiftyNine: {
        type: Number,
        default: 0
    },
    sixtyToSixtyFour: {
        type: Number,
        default: 0
    },
    sixtyFiveToSixtyNine: {
        type: Number,
        default: 0
    },
    seventyToSeventyFour: {
        type: Number,
        default: 0
    },
    seventyFiveToSeventyNine: {
        type: Number,
        default: 0
    },
    eightyAbove: {
        type: Number,
        default: 0
    }
})

const censusReportSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },

    totalHouseholds: {
        type: Number,
        default: 0
    },

    totalFamilies: {
        type: Number,
        default: 0
    },

    male: {
        type: Number,
        default: 0
    },

    female: {
        type: Number,
        default: 0
    },
    ageGroup: {
        type: ageGroupSchema,
        default: {}
    },
    totalPopulation: {
        type: Number,
        default: 0
    },
    pwd: {
        type: Number,
        default: 0
    },
    senior: {
        type: Number,
        default: 0
    }, 
    soloParent: {
        type: Number,
        default: 0
    },
    indigenous: {
        type: Number,
        default: 0
    },
    ofw: {
        type: Number,
        default: 0
    },
    p4: {
        type: Number,
        default: 0
    },
    elementary: {
        type: Number,
        default: 0
    },
    highSchool: {
        type: Number,
        default: 0
    },
    vocational: {
        type: Number,
        default: 0
    },
    undegraduate: {
        type: Number,
        default: 0
    },
    masteral: {
        type: Number,
        default: 0
    }, 
    doctorate: {
        type: Number,
        default: 0
    },
    noEducation: {
        type: Number,
        default: 0
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
});



export default censusReportSchema;