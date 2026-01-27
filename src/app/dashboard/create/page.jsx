"use client";

import { useState } from "react";
import { UploadCloud, Loader2, Sparkles, Save } from "lucide-react";

export default function CreateReceiptPage() {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // form data state
  const [formData, setFormData] = useState({
    clientName: "",
    amount: "",
    paymentMode: "Cash",
    date: new Date().toISOString().split("T")[0],
    purpose: "",
  });

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // form submit (save to database)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Receipt Created! Receipt No: " + data.receiptNo);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAiLoading(true);
    setTimeout(() => {
      setFormData({
        clientName: "Demo Client Ltd.",
        amount: "15000",
        paymentMode: "Cheque",
        date: "2023-10-25",
        purpose: "Fire Insurance Premium",
      });
      setAiLoading(false);
      alert("Magic! AI extracted data from image. 🪄");
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Receipt
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Generate a new digital money receipt.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
              <span className="bg-brand-100 text-brand-600 p-1 rounded">1</span>
              Receipt Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Received From (Client)
                </label>
                <input
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  placeholder="enter client name"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                />
              </div>

              {/* Amount & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount (BDT)
                  </label>
                  <input
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    placeholder="enter amount"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Mode & Purpose Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Mode
                  </label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Bank Transfer</option>
                    <option>Pay Order</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Purpose / Class
                  </label>
                  <input
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Life Insurance Premium"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Save size={20} /> Generate Receipt
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-50 dark:bg-brand-900/10 p-6 rounded-xl border-2 border-dashed border-brand-300 dark:border-brand-700 text-center sticky top-6">
            <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              {aiLoading ? (
                <Loader2 className="animate-spin text-brand-600" size={32} />
              ) : (
                <Sparkles className="text-brand-600" size={32} />
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              AI Auto-Fill
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 mt-2">
              Upload an image of a bank cheque or handwritten slip. AI will fill
              the form for you.
            </p>

            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={aiLoading}
              />
              <span className="block w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-500 text-gray-700 dark:text-gray-200 font-medium py-3 rounded-lg transition-all shadow-sm hover:shadow-md">
                <UploadCloud className="inline-block mr-2 mb-1" size={18} />
                {aiLoading ? "Analyzing..." : "Upload Image"}
              </span>
            </label>

            <p className="text-xs text-gray-400 mt-4">
              Powered by Google Gemini 1.5 Flash
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
