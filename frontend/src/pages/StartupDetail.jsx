// pages/StartupDetailPage.jsx
import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import startups from "../data/startups";

const StartupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const startup = startups.find((s) => s.id === +id);

  const [amount, setAmount] = useState("");

  if (!startup) return <p>Startup not found.</p>;

  const handleFund = (e) => {
    e.preventDefault();
    // hook into your backend / Stripe / etc.
    alert(`Thanks! You pledged $${amount} to ${startup.name}.`);
    navigate(-1); // go back to listings
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to All Startups
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          {startup.logo && (
            <img
              src={startup.logo}
              alt={`${startup.name} logo`}
              className="h-16 w-16 object-contain mr-4 bg-gray-100 p-1 rounded-md"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{startup.name}</h1>
            <p className="text-sm text-gray-500">{startup.industry}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{startup.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
          <div>
            <strong>Founder:</strong> {startup.founder}
          </div>
          <div>
            <strong>Stage:</strong> {startup.fundingStage}
          </div>
          <div>
            <strong>Team Size:</strong> {startup.teamSize || "N/A"}
          </div>
        </div>

        <form onSubmit={handleFund} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Pledge Amount (USD)</span>
            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors"
          >
            Fund {startup.name}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartupDetailPage;
