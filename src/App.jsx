// src/App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function App() {
  const [stage, setStage] = useState("login"); // login | dashboard | market | balance
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Login validation
  const handleLogin = () => {
    if (password.length === 8) {
      setStage("dashboard");
    } else {
      alert("Password must be 8 digits!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white flex items-center justify-center">
      {/* App Title */}
      <div className="absolute top-4 text-2xl font-bold text-purple-300">
        <TypeAnimation
          sequence={["DeluxeMart", 2000, ""]}
          wrapper="span"
          speed={120}
          repeat={Infinity}
        />
      </div>

      {/* LOGIN */}
      {stage === "login" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-80 bg-purple-800 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <input
            type="password"
            placeholder="Password (8 digits)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded"
          >
            Login
          </button>
        </motion.div>
      )}

      {/* DASHBOARD */}
      {stage === "dashboard" && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setStage("market")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Marketplace
            </button>
            <button
              onClick={() => setStage("balance")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Balance
            </button>
          </div>
        </motion.div>
      )}

      {/* MARKETPLACE */}
      {stage === "market" && (
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-6 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Marketplace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Accessories", "Electronics", "Food Stuffs"].map((item) => (
              <div
                key={item}
                onClick={() => alert(`${item} clicked!`)}
                className="bg-purple-800 text-center p-6 rounded cursor-pointer hover:scale-105 transition-transform"
              >
                {item}
              </div>
            ))}
          </div>
          <button
            onClick={() => setStage("dashboard")}
            className="mt-6 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Back
          </button>
        </motion.div>
      )}

      {/* BALANCE PAGE */}
      {stage === "balance" && (
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Your Balance</h2>
          <p className="text-lg mb-3">💰 $1,250.00</p>

          <h3 className="font-semibold mb-2">Payment History</h3>
          <ul className="text-sm mb-4">
            <li>✔ Paid Bills - $50</li>
            <li>✔ Grocery - $120</li>
            <li>✔ Mobile Recharge - $20</li>
          </ul>

          <h3 className="font-semibold mb-2">Features</h3>
          <div className="flex flex-col gap-2">
            {["Online Payment", "Bills", "Card", "Electrical Payment"].map(
              (feature) => (
                <button
                  key={feature}
                  onClick={() => alert(`${feature} form opened!`)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                >
                  {feature}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => setStage("dashboard")}
            className="mt-6 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Back
          </button>
        </motion.div>
      )}
    </div>
  );
}