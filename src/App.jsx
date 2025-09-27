// src/App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function App() {
  const [stage, setStage] = useState("login"); // login | dashboard | market | balance | accessories | electronics | food | payment | bills | card | electrical
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

  // Reusable back button
  const BackButton = ({ to }) => (
    <button
      onClick={() => setStage(to)}
      className="mt-6 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
    >
      Back
    </button>
  );

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
            <div
              onClick={() => setStage("accessories")}
              className="bg-purple-800 text-center p-6 rounded cursor-pointer hover:scale-105 transition-transform"
            >
              Accessories
            </div>
            <div
              onClick={() => setStage("electronics")}
              className="bg-purple-800 text-center p-6 rounded cursor-pointer hover:scale-105 transition-transform"
            >
              Electronics
            </div>
            <div
              onClick={() => setStage("food")}
              className="bg-purple-800 text-center p-6 rounded cursor-pointer hover:scale-105 transition-transform"
            >
              Food Stuffs
            </div>
          </div>
          <BackButton to="dashboard" />
        </motion.div>
      )}

      {/* MARKETPLACE SUB-PAGES */}
      {stage === "accessories" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Accessories</h2>
          <p>Here you’ll find watches, bags, and jewelry.</p>
          <BackButton to="market" />
        </motion.div>
      )}

      {stage === "electronics" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Electronics</h2>
          <p>Shop phones, laptops, and gadgets.</p>
          <BackButton to="market" />
        </motion.div>
      )}

      {stage === "food" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Food Stuffs</h2>
          <p>Fresh groceries and daily needs.</p>
          <BackButton to="market" />
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
            <button
              onClick={() => setStage("payment")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Online Payment
            </button>
            <button
              onClick={() => setStage("bills")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Bills
            </button>
            <button
              onClick={() => setStage("card")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Card
            </button>
            <button
              onClick={() => setStage("electrical")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Electrical Payment
            </button>
          </div>

          <BackButton to="dashboard" />
        </motion.div>
      )}

      {/* BALANCE SUB-PAGES */}
      {stage === "payment" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Online Payment</h2>
          <input
            type="text"
            placeholder="Recipient"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <button className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">
            Pay Now
          </button>
          <BackButton to="balance" />
        </motion.div>
      )}

      {stage === "bills" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Bills Payment</h2>
          <input
            type="text"
            placeholder="Bill Type"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <button className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">
            Pay Bill
          </button>
          <BackButton to="balance" />
        </motion.div>
      )}

      {stage === "card" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Card Payment</h2>
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <input
            type="text"
            placeholder="Expiry Date"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <button className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">
            Process Card
          </button>
          <BackButton to="balance" />
        </motion.div>
      )}

      {stage === "electrical" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 w-96 bg-purple-800 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Electrical Payment</h2>
          <input
            type="text"
            placeholder="Meter Number"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <input
            type="number"
            placeholder="Units"
            className="w-full p-2 rounded bg-purple-700 mb-3 outline-none"
          />
          <button className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">
            Recharge
          </button>
          <BackButton to="balance" />
        </motion.div>
      )}
    </div>
  );
}