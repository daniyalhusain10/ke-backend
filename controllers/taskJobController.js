
import job from '../models/taskModel.js'


export const createJob = async (req, res) => {

    const { 
        jobCreatedDate, 
        inputField1, 
        inputField2, 
        inputField3, 
        inputField4, 
        inputField5, 
        inputField6, 
        inputField7, 
        fitterName, 
        workCategory,
        shift,
        status,
        kkName,
    } = req.body;

    // Basic Validation: Check if required fields are present
    if (!jobCreatedDate || !inputField1) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide Job Created Date, Input Field 1 (Site/Title),.' 
        });
    }

    try {

        const newJob = await job.create({
            jobCreatedDate,
            inputField1,
            inputField2,
            inputField3,
            inputField4,
            inputField5,
            inputField6,
            inputField7,
            workCategory,
            status,
            fitterName,
            kkName,
        });

        // Success Response (201 Created)
        res.status(201).json({
            success: true,
            message: 'New Job entry created successfully!',
            job: newJob,
            jobId: newJob._id 
        });
        
    } catch (error) {
        console.error("Error during job creation:", error);

        // Mongoose Validation Error (e.g., enum mismatch)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }

        // Generic Server Error
        res.status(500).json({ 
            success: false, 
            message: 'Server error: Could not save the job entry.',
            detail: error.message
        });
    }
};

    // getting jobs
export const getJobs = async (req, res) => {
    try {
        // Job collection se saare documents fetch karein aur latest date ke hisaab se sort karein
        const jobs = await job.find({}).sort({ jobCreatedDate: -1 }); 
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs // Saara data yahan hai
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error: Could not fetch job entries.'
        });
    }
};

// deleting jobs

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await job.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task nahi mila!" });
        }

        res.status(200).json({ success: true, message: "Task successfully delete ho gaya." });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ success: false, message: "Server error: Delete nahi ho saka." });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // { new: true } se humein updated document wapas milta hai
        const updatedTask = await job.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task nahi mila update karne ke liye!" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Task successfully update ho gaya.",
            data: updatedTask 
        });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: "Server error: Update nahi ho saka." });
    }
};
