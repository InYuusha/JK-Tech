const {
  createBucketMeta,
  deleteBucket,
  listBuckets,
  deleteBucketMeta,
  createBucket,
  getBucket,
} = require("../services/bucket");

const { deleteAllFilesMeta } = require("../services/file");
const { CustomError } = require("../utils/error_handling");
const { validateBucketName } = require("../utils/validations");

exports.createBucket = async (req, res) => {
  try {
    const { name: bucketName } = req.body;
    const {
      user: { userId },
    } = req;

    // validate bucket name
    validateBucketName(bucketName);

    const bucket = await getBucket({ userId, bucketId: bucketName });
    if (bucket) throw new CustomError("Bucket Already Exists ", 403);

    await Promise.all([
      createBucket({ userId, bucketName }),
      createBucketMeta({ userId, bucketName }),
    ]);

    return res.status(201).json({
      message: "Successfully created bucket",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};



exports.deleteBucket = async (req, res) => {
  try {
    const { bucketId } = req.params;
    const {
      user: { userId },
    } = req;

    await Promise.all([
      deleteBucket({ userId, bucketId }),
      deleteBucketMeta({ userId, bucketId }),
      deleteAllFilesMeta({ userId, bucketId }),
    ]);
    return res.status(200).json({
      message: "Successfylly deleted bucket",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: `Failed to delete bucket ${error.message}`,
    });
  }
};

exports.listBuckets = async (req, res) => {
  try {
    const {
      user: { userId },
    } = req;
    const buckets = await listBuckets({ userId });
    return res.status(200).json({
      message: "Successfully fetched buckets",
      data: buckets,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: `Failed to fetch buckets ${error.message}`,
    });
  }
};
