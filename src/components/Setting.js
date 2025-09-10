import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Setting.css";

const Setting = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  // Real-time password match check (trims spaces)
  useEffect(() => {
    const cleanNew = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (confirmPassword.trim() === "") {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(cleanNew === cleanConfirm);
    }
  }, [newPassword, confirmPassword]);

  // Log inputs without extra quotes
  useEffect(() => {
    console.log("Inputs changed:", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
  }, [currentPassword, newPassword, confirmPassword]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      toast.error("❌ New password and confirm password do not match.");
      return;
    }

    if (!currentPassword.trim()) {
      toast.error("❌ Please enter your current password.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
         user.role?.toUpperCase() === "ADMIN"
          ? `http://localhost:8080/admin/${user.id}/change-password`
          : `http://localhost:8080/employee/${user.id}/change-password`;

      const payload = {
        oldPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
        confirmPassword: confirmPassword.trim(),
      };

      console.log("Sending password change request:", { endpoint, payload });

      await axios.put(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("✅ Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "❌ Error updating password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setting-container">
      <h2>Update Password</h2>
      <form onSubmit={handleChangePassword}>
        <label className="required-label">Current Password</label>
        <input
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label className="required-label">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label className="required-label">Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ borderColor: passwordMatch ? "" : "red" }}
        />
        {!passwordMatch && (
          <p style={{ color: "red", margin: "5px 0" }}>
            ❌ Passwords do not match
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Setting;
