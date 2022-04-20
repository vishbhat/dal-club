// @Author: Vishwanath Suresh
const express = require("express");
const { getJobsList, getJob, applyJob, addJob, deleteJob, updateJob, getApplications, getApplicationsCount } = require("../controllers/careers.controller");

const CareersRouter = express.Router();

CareersRouter.get("/", getJobsList);
CareersRouter.post("/applyJob", applyJob);
CareersRouter.post("/addJob", addJob);
CareersRouter.delete("/:jobId", deleteJob);
CareersRouter.post("/updateJob/:jobId", updateJob);
CareersRouter.get("/applications", getApplicationsCount);
CareersRouter.get("/applications/:jobId", getApplications);
CareersRouter.get("/:jobId", getJob);

module.exports = CareersRouter;