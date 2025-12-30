import { createJob } from "../controllers/TaskJobController.js";
import { getJobs } from "../controllers/TaskJobController.js";
import { updateTask } from "../controllers/TaskJobController.js";
import { deleteTask } from "../controllers/TaskJobController.js";

import express from 'express'

const router = express.Router()
router.post("/admin-task",createJob)
router.get('/get-jobs', getJobs);

router.delete("/:id", deleteTask)
router.put("/:id", updateTask)

export default router;
