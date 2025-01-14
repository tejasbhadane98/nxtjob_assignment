const express = require("express");
const Jobs = require("../models/jobs");
const router = express.Router();

router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Jobs.find();
        // console.log(jobs, "jobs")
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/jobs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Jobs.findById(id);
        if (!job) {
            return res.status(404).json({ error: `Job posting not found for id ${id}.` });
        }
        res.status(200).json(job);
    } catch (err) {
        console.log("err is here")
        res.status(500).json({ error: err.message });
    }
});

router.post('/jobs', async (req, res) => {
    const { title, company, location, salary, description } = req.body;

    if (!title || !company || !location || !description) {
        return res.status(400).json({ error: 'Title, company, location, and description are all required.' });
    }

    try {
        const job = new Jobs({ title, company, location, salary, description });
        await job.save();
        // console.log(req.body, Jobs,  "After Setting")
        res.status(200).json({ job, message: "Jobs Added Succesfully" })
    } catch (err) {
        console.log("err is here")
        res.status(500).json({ error: err.message });
    }
});



router.put('/jobs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, company, location, salary, description } = req.body;

    try {
        const job = await Jobs.findByIdAndUpdate(
            id,
            { title, company, location, salary, description },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ error: `Unable to update the job` });
        }

        res.status(200).json(job);
    } catch (err) {
        console.log("err is here")
        res.status(500).json({ error: err.message });
    }
});


router.delete('/jobs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Jobs.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ error: 'Job posting not found.' });
        }

        res.json({ message: 'Job posting deleted successfully.' });
    } catch (err) {
        console.log("err is here")
        res.json({ error: err.message });
    }
});

module.exports = router;