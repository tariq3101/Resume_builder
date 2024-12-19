const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: { 
        type: String, 
        required: true 
    },
    personalInfo: {
        fullName: { type: String},
        email: { type: String},
        phone: { type: String},
        address: { type: String },
        website: { type: String },
        links: {
            type: [String],
            validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
        },
        jobRole: { 
            type: String,  
            trim: true 
        }
    },
    education: [
        {
            school: { type: String },
            degree: { type: String },
            fieldOfStudy: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            grade: { type: String },
        }
    ],
    workExperience: [
        {
            company: { type: String },
            role: { type: String },
            description: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
        }
    ],
    skills: [String],
    projects: [
        {
            title: { type: String },
            description: { type: String },
            link: { type: String },
        }
    ],
    awards: [
        {
            title: { type: String},
            organization: { type: String },
            date: { type: Date },
        }
    ],
    certifications: [
        {
            name: { type: String},
            issuer: { type: String },
            issueDate: { type: Date },
            expiryDate: { type: Date },
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('Resume', resumeSchema);
