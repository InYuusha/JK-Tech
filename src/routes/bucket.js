const express = require("express");
const router = express.Router();
const bucketController = require("../controllers/bucket");

router.post("/", bucketController.createBucket);
router.delete("/:bucketId", bucketController.deleteBucket);
router.get("/", bucketController.listBuckets);

module.exports = router;
