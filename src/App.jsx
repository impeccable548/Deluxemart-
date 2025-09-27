// src/App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function App() {
  const [stage, setStage] = useState("login"); // login | dashboard | market | balance | accessories | electronics | food | payment | bills | card | electrical | topup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [balance, setBalance] = useState(1250); // live balance
  const [history, setHistory] = useState([
    { text: "Paid Bills - $50", amount: 50 },
    { text: "Grocery - $120", amount: 120 },
    { text: "Mobile Recharge - $20", amount: 20 },
  ]);

  // form states
  const [payRecipient, setPayRecipient] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [billType, setBillType] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardAmount, setCardAmount] = useState("");
  const [elecUnits, setElecUnits] = useState("");
  const [topUpAmount, setTopUpAmount] = useState("");

  const handleLogin = () => {
    if (password.length === 8) {
      setStage("dashboard");
    } else {
      alert("Password must be 8 digits!");
    }
  };

  const BackButton = ({ to = "dashboard" }) => (
    <button
      onClick={() => setStage(to)}
      className="mt-6 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
    >
      Back
    </button>
  );

  // Generic transaction handler for spending (deduct) and logging
  const handleSpend = (amount, label) => {
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount greater than 0");
      return false;
    }
    if (amount > balance) {
      alert("Insufficient balance!");
      return false;
    }
    setBalance((b) => +(b - amount));
    setHistory((h) => [{ text: `${label} - $${amount.toFixed(2)}`, amount }, ...h]);
    return true;
  };

  // Generic top-up handler (credit)
  const handleTopUp = (amount) => {
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid top-up amount greater than 0");
      return false;
    }
    setBalance((b) => +(b + amount));
    setHistory((h) => [{ text: `Top-Up - $${amount.toFixed(2)}`, amount: -amount }, ...h]);
    return true;
  };

  // convenience: format currency
  const fmt = (n) => `$${n.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white flex items-center justify-center p-4">
      {/* App Title */}
      <div className="absolute top-4 text-2xl font-bold text-purple-300">
        <TypeAnimation sequence={["DeluxeMart", 2000, ""]} wrapper="span" speed={120} repeat={Infinity} />
      </div>

      {/* LOGIN */}
      {stage === "login" && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm bg-purple-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <input type="password" placeholder="Password (8 digits)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <button onClick={handleLogin} className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">Login</button>
        </motion.div>
      )}

      {/* DASHBOARD */}
      {stage === "dashboard" && (
        <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-center">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setStage("market")} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Marketplace</button>
            <button onClick={() => setStage("balance")} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Balance</button>
          </div>
        </motion.div>
      )}

      {/* MARKETPLACE */}
      {stage === "market" && (
        <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Marketplace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div onClick={() => setStage("accessories")} className="bg-purple-800 text-center p-6 rounded cursor-pointer hover:scale-105 transition-transform">Accessories</div>
            <div onClick={() => setStage("electronics")} className="bg-purple-800 text-center p-6 rounded cursor-pointer hover:scale-105 transition-transform">Electronics</div>
            <div onClick={() => setStage("food")} className="bg-purple-800 text-center p-6 rounded cursor-pointer hover:scale-105 transition-transform">Food Stuffs</div>
          </div>
          <BackButton to="dashboard" />
        </motion.div>
      )}

      {/* MARKET SUBPAGES */}
      {stage === "accessories" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Accessories</h2>
          <p className="mb-4">Watches, bags, jewelry — sample items below.</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-purple-700 rounded">Leather Watch - {fmt(45)}</div>
            <div className="p-3 bg-purple-700 rounded">Canvas Bag - {fmt(30)}</div>
            <div className="p-3 bg-purple-700 rounded">Bracelet - {fmt(15)}</div>
          </div>
          <BackButton to="market" />
        </motion.div>
      )}

      {stage === "electronics" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Electronics</h2>
          <p className="mb-4">Phones, laptops & gadgets — click an item to 'buy'.</p>
          <div className="grid grid-cols-1 gap-3">
            <button className="p-3 bg-purple-700 rounded text-left" onClick={() => { if (handleSpend(199, "Bought: Smartphone")) alert("Purchased smartphone"); }}>Smartphone - {fmt(199)}</button>
            <button className="p-3 bg-purple-700 rounded text-left" onClick={() => { if (handleSpend(449, "Bought: Laptop")) alert("Purchased laptop"); }}>Laptop - {fmt(449)}</button>
            <button className="p-3 bg-purple-700 rounded text-left" onClick={() => { if (handleSpend(29, "Bought: Headphones")) alert("Purchased headphones"); }}>Headphones - {fmt(29)}</button>
          </div>
          <BackButton to="market" />
        </motion.div>
      )}

      {stage === "food" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Food Stuffs</h2>
          <p className="mb-4">Groceries & daily needs.</p>
          <div className="grid grid-cols-1 gap-3">
            <button className="p-3 bg-purple-700 rounded text-left" onClick={() => { if (handleSpend(12, "Bought: Rice (5kg)")) alert("Purchased rice"); }}>Rice (5kg) - {fmt(12)}</button>
            <button className="p-3 bg-purple-700 rounded text-left" onClick={() => { if (handleSpend(6, "Bought: Oil")) alert("Purchased oil"); }}>Cooking Oil - {fmt(6)}</button>
            <button className="p-3 bg-purple-700 rounded text-left" onClick={() => { if (handleSpend(8, "Bought: Chicken")) alert("Purchased chicken"); }}>Chicken - {fmt(8)}</button>
          </div>
          <BackButton to="market" />
        </motion.div>
      )}

      {/* BALANCE PAGE */}
      {stage === "balance" && (
        <motion.div initial={{ y: -300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Balance</h2>
            <button onClick={() => setStage("topup")} className="text-sm bg-green-600 px-3 py-1 rounded">Top-Up</button>
          </div>

          <p className="text-lg mb-3">💰 {fmt(balance)}</p>

          <h3 className="font-semibold mb-2">Payment History</h3>
          <ul className="text-sm mb-4 max-h-40 overflow-y-auto">
            {history.length === 0 && <li>No transactions yet</li>}
            {history.map((item, i) => (
              <li key={i} className="mb-1">✔ {item.text}</li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2">Features</h3>
          <div className="flex flex-col gap-2">
            <button onClick={() => setStage("payment")} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Online Payment</button>
            <button onClick={() => setStage("bills")} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Bills</button>
            <button onClick={() => setStage("card")} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Card</button>
            <button onClick={() => setStage("electrical")} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Electrical Payment</button>
          </div>

          <BackButton to="dashboard" />
        </motion.div>
      )}

      {/* Top-Up */}
      {stage === "topup" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Top-Up Balance</h2>
          <input type="number" value={topUpAmount} onChange={(e) => setTopUpAmount(e.target.value)} placeholder="Amount" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <button onClick={() => { const amt = parseFloat(topUpAmount); if (handleTopUp(amt)) { alert("Top-up successful"); setTopUpAmount(""); } }} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded">Top-Up Now</button>
          <BackButton to="balance" />
        </motion.div>
      )}

      {/* BALANCE FEATURES - FORMS */}
      {stage === "payment" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Online Payment</h2>
          <input type="text" value={payRecipient} onChange={(e) => setPayRecipient(e.target.value)} placeholder="Recipient (name or account)" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder="Amount" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <button onClick={() => {
            const amt = parseFloat(payAmount);
            if (!payRecipient) { alert("Enter recipient"); return; }
            if (handleSpend(amt, `Online Payment to ${payRecipient}`)) {
              setPayAmount(""); setPayRecipient("");
              alert("Payment sent!");
            }
          }} className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">Pay Now</button>
          <BackButton to="balance" />
        </motion.div>
      )}

      {stage === "bills" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Bills Payment</h2>
          <input type="text" value={billType} onChange={(e) => setBillType(e.target.value)} placeholder="Bill Type (e.g. Electricity, Water)" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <input type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="Amount" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <button onClick={() => {
            const amt = parseFloat(billAmount);
            if (!billType) { alert("Enter bill type"); return; }
            if (handleSpend(amt, `Paid: ${billType}`)) {
              setBillAmount(""); setBillType("");
              alert("Bill paid!");
            }
          }} className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">Pay Bill</button>
          <BackButton to="balance" />
        </motion.div>
      )}

      {stage === "card" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Card Payment</h2>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <input type="number" value={cardAmount} onChange={(e) => setCardAmount(e.target.value)} placeholder="Amount" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <button onClick={() => {
            const amt = parseFloat(cardAmount);
            if (!cardNumber) { alert("Enter card number"); return; }
            if (handleSpend(amt, `Card Payment (****${cardNumber.slice(-4)})`)) {
              setCardAmount(""); setCardNumber("");
              alert("Card processed!");
            }
          }} className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">Process Card</button>
          <BackButton to="balance" />
        </motion.div>
      )}

      {stage === "electrical" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full max-w-md bg-purple-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Electrical Payment</h2>
          <input type="text" value={elecUnits} onChange={(e) => setElecUnits(e.target.value)} placeholder="Meter Number / Units" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <input type="number" placeholder="Units ($)" onChange={(e) => setElecUnits(e.target.value)} className="hidden" />
          <input id="elec-amount" type="number" placeholder="Amount" className="w-full p-2 rounded bg-purple-700 mb-3 outline-none" />
          <button onClick={() => {
            const input = document.getElementById("elec-amount");
            const amt = parseFloat(input ? input.value : 0);
            if (!elecUnits) { alert("Enter meter number or unit id"); return; }
            if (handleSpend(amt, `Electrical Payment for ${elecUnits}`)) {
              input.value = "";
              setElecUnits("");
              alert("Electricity recharged!");
            }
          }} className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded">Recharge</button>
          <BackButton to="balance" />
        </motion.div>
      )}
    </div>
  );
}