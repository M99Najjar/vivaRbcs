const express = require("express");
const {
  getSubjects,
  getSubject,
  addSubject,
  deleteSubject,
  updateSubject,
  getSubjectBy,
} = require("../controllers/subjectsController");
const { isLogedin } = require("../middlewares/isLogedin");
const { isAdmin } = require("../middlewares/isAdmin");
const router = express.Router();
////////////////////////////
router.use(isLogedin);

router.get("/", getSubjects);
router.get("/by", getSubjectBy);
router.get("/:subject_id", getSubject);

router.post("/", isAdmin, addSubject);

router.delete("/:subject_id", isAdmin, deleteSubject);
router.patch("/:subject_id", isAdmin, updateSubject);

module.exports = router;
