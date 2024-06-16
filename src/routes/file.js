const express = require('express');
const router = express.Router();
const {uploadFile, streamFile, deleteFile, streamAllFilesInBucket} = require('../controllers/file');
const upload = require('../middlewares/multer');

router.post('/:bucketId/file', upload.single('file'), uploadFile);
router.get('/:bucketId/file/:fileName', streamFile);
router.get('/:bucketId/files', streamAllFilesInBucket)
router.delete('/:bucketId/file/:fileName', deleteFile)

module.exports = router;
