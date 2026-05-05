const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

exports.blockUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
  await AuditLog.create({
    adminId: req.user._id,
    action: "BLOCK",
    targetId: req.params.id,
  });
  res.json({ message: "User blocked" });
};

exports.promoteUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: "admin" });
  await AuditLog.create({
    adminId: req.user._id,
    action: "PROMOTE",
    targetId: req.params.id,
  });
  res.json({ message: "User promoted" });
};

// Unblock a user
exports.unblockUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
  await AuditLog.create({
    adminId: req.user._id,
    action: "UNBLOCK",
    targetId: req.params.id,
  });
  res.json({ message: "User unblocked successfully" });
};

// Demote an admin back to a regular user
exports.demoteUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: "user" });
  await AuditLog.create({
    adminId: req.user._id,
    action: "DEMOTE",
    targetId: req.params.id,
  });
  res.json({ message: "Admin demoted to regular user" });
};

// Get all audit logs
exports.getAuditLogs = async (req, res) => {
  try {
    // .populate() lets us see the actual names instead of just IDs
    const logs = await AuditLog.find()
      .populate("adminId", "username email")
      .populate("targetId", "username")
      .sort({ createdAt: -1 }); // Newest first

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
