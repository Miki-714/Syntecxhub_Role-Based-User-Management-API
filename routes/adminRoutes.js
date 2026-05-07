const express = require("express");
const router = express.Router();
const {
  blockUser,
  unblockUser,
  promoteUser,
  demoteUser,
  getAuditLogs,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.use(protect);
router.use(authorize("admin"));

router.put("/block/:id", blockUser);
router.put("/unblock/:id", unblockUser);
router.put("/promote/:id", promoteUser);
router.put("/demote/:id", demoteUser);
router.get("/logs", protect, authorize("admin"), getAuditLogs);

module.exports = router;
