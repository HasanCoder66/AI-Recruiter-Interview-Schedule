import express from "express"
import createCandidate from "../Controllers/candidate.js"

const candidateRoute = express.Router()


candidateRoute.post("/", createCandidate);



export default candidateRoute