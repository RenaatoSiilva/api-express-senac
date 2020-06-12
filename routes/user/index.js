const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user");

router.get(
  "/:id",
  UserController.find
);
router.get(
  "/",
  UserController.list
);
router.post(
  "/",
  UserController.create
);
router.put(
  "/:id",
  UserController.update
);
router.delete(
  "/:id",
  UserController.delete
);

module.exports = router;
