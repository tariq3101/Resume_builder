const express = require('express');
const verifyToken = require('../middleware/verifyToken'); 
const Resume = require('../models/Resume'); 
const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
    const { title, personalInfo, education, workExperience, projects, skills, awards, certifications, templateid } = req.body;

    const existingResume = await Resume.findOne({ user: req.user.id, title });
    if (existingResume) {
        return res.status(400).json({ message: 'A resume with this title already exists.' });
    }

    try {
        const resume = new Resume({
            user: req.user.id,
            title,
            personalInfo: personalInfo || {},
            education: education || [],
            workExperience: workExperience || [],
            projects: projects || [],
            skills: skills || [],
            awards: awards || [],
            certifications: certifications || [],
            templateid
        });

        
        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ message: 'Error creating resume', error: error.message });
    }
});

// PATCH /api/resumes/update - Update a user's resume data (incremental save)
router.patch('/update/:resumeId', verifyToken, async (req, res) => {
    const { resumeId } = req.params; // Extract the resumeId from the route
    const { personalInfo, education, workExperience, projects, skills, awards, certifications } = req.body;

    try {
        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, user: req.user.id }, // Find the resume by ID and user
            {
                $set: {
                    ...(personalInfo && { personalInfo }),
                    ...(education && { education }),
                    ...(workExperience && { workExperience }),
                    ...(projects && { projects }),
                    ...(skills && { skills }),
                    ...(awards && { awards }),
                    ...(certifications && { certifications }),
                    updatedAt: Date.now(),
                },
            },
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json(updatedResume);
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: 'Error updating resume', error: error.message });
    }
});

// GET /api/resumes - Retrieve the user's saved resume data
router.get('/', verifyToken, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }); // Find all resumes for the user

        if (!resumes || resumes.length === 0) {
            return res.status(404).json({ message: 'No resumes found' });
        }

        res.status(200).json(resumes); // Return all resumes
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ message: 'Error fetching resumes', error: error.message });
    }
});

router.get('/:resumeId', verifyToken, async (req, res) => {
    const { resumeId } = req.params;

    try {
        const resume = await Resume.findOne({ _id: resumeId, user: req.user.id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json(resume); 
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ message: 'Error fetching resume', error: error.message });
    }
});

module.exports = router;