import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, KeyRound, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { findUserByEmail, resetUserPassword } from "../../services/localStorage";

interface ForgotPasswordPageProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

type Step = "email" | "reset" | "success";

export function ForgotPasswordPage({ onBack, onSwitchToLogin }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = findUserByEmail(email);
      if (!user) {
        toast.error("No account found with that email address.");
        return;
      }
      // In a real app, send a reset link. Here we go straight to reset step.
      toast.success("Account found! Please set your new password.");
      setStep("reset");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      resetUserPassword(email, newPassword);
      toast.success("Password reset successfully! 🎉");
      setStep("success");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-8xl opacity-20"
      >
        🔑
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 text-8xl opacity-20"
      >
        🛡️
      </motion.div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-white text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl mb-4"
          >
            {step === "success" ? "✅" : "🔐"}
          </motion.div>
          <h1 className="text-3xl font-extrabold mb-2">
            {step === "email" && "Forgot Password?"}
            {step === "reset" && "Set New Password"}
            {step === "success" && "Password Reset!"}
          </h1>
          <p className="text-green-100">
            {step === "email" && "Enter your email to reset your password"}
            {step === "reset" && "Choose a strong new password"}
            {step === "success" && "Your password has been updated"}
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-colors text-lg"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-2xl text-lg font-bold shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Checking..." : "Find My Account"}
              </Button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-green-600 hover:text-green-700 font-bold"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Step 2: New Password */}
          {step === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <KeyRound className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm text-green-800 font-medium">
                  Resetting password for <span className="font-bold">{email}</span>
                </p>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-colors text-lg"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-colors text-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>

                {/* Password match indicator */}
                {confirmPassword && (
                  <p className={`text-sm mt-2 font-medium ${newPassword === confirmPassword ? "text-green-600" : "text-red-500"}`}>
                    {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-2xl text-lg font-bold shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          {/* Step 3: Success */}
          {step === "success" && (
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <CheckCircle className="w-20 h-20 text-green-500" />
              </motion.div>
              <div>
                <p className="text-gray-700 text-lg font-medium">Your password has been reset successfully.</p>
                <p className="text-gray-500 mt-1">You can now sign in with your new password.</p>
              </div>
              <Button
                onClick={onSwitchToLogin}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-2xl text-lg font-bold shadow-lg"
              >
                Go to Sign In
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
