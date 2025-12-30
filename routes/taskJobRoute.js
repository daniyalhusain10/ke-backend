import { updateTask,deleteTask,getJobs,createJob  } from "../controllers/taskJobController.js";


import express from 'express'

const router = express.Router()
router.post("/admin-task",createJob)
router.get('/get-jobs', getJobs);

router.delete("/:id", deleteTask)
router.put("/:id", updateTask)

export default router;
