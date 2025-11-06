import React, { useState } from "react";
import API from "../api/api.js";
import DOMPurify from "dompurify";

const CreatePayment = () => {
  const [form, setForm] = useState({
    amount: "",
    currency: "",
    provider: "",
    recipientAccount: "",
    swiftCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sanitize = (value) => value.replace(/\$/g, "").replace(/\./g, "");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!/^\d+(\.\d{1,2})?$/.test(form.amount)) 
      newErrors.amount = "Enter a valid amount";
    if (!["USD", "EUR", "ZAR"].includes(form.currency.toUpperCase())) 
      newErrors.currency = "Currency must be USD, EUR, or ZAR";
    if (form.provider.toUpperCase() !== "SWIFT") 
      newErrors.provider = "Provider must be SWIFT";
    if (!/^\d+$/.test(form.recipientAccount)) 
      newErrors.recipientAccount = "Recipient account must be numeric";
    if (!/^[A-Z0-9]{8,11}$/.test(form.swiftCode.toUpperCase())) 
      newErrors.swiftCode = "SWIFT Code must be 8-11 uppercase alphanumeric characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const sanitizedForm = {
        amount: parseFloat(form.amount),
        currency: DOMPurify.sanitize(form.currency),
        provider: DOMPurify.sanitize(form.provider),
        recipientAccount: DOMPurify.sanitize(form.recipientAccount),
        swiftCode: DOMPurify.sanitize(form.swiftCode),
      };
      console.log("Sending payment data:", sanitizedForm);
      await API.post("/payments", sanitizedForm);
      alert("Payment created successfully!");
      setForm({ amount: "", currency: "", provider: "", recipientAccount: "", swiftCode: "" });
      setErrors({});
    } catch (err) {
      console.error("Full error:", err);
      console.error("Backend response:", err.response?.data);
      console.error("Status:", err.response?.status);
      alert(err.response?.data?.msg || err.response?.data?.error || "Payment creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">New Payment</h2>
          <p className="text-slate-600">Send an international payment securely</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount and Currency - Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-500 font-semibold">$</span>
                <input
                  name="amount"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
              >
                <option value="">Select currency</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="ZAR">ZAR - South African Rand</option>
              </select>
              {errors.currency && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.currency}
                </p>
              )}
            </div>
          </div>

          {/* Provider */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Payment Provider
            </label>
            <div className="relative">
              <input
                name="provider"
                placeholder="SWIFT"
                value={form.provider}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              />
              <div className="absolute right-4 top-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-semibold">
                SWIFT only
              </div>
            </div>
            {errors.provider && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.provider}
              </p>
            )}
          </div>

          {/* Recipient Account */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Recipient Account Number
            </label>
            <input
              name="recipientAccount"
              placeholder="Enter recipient's account number"
              value={form.recipientAccount}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            />
            {errors.recipientAccount && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.recipientAccount}
              </p>
            )}
          </div>

          {/* SWIFT Code */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              SWIFT Code
            </label>
            <input
              name="swiftCode"
              placeholder="e.g., ABCDUS33XXX"
              value={form.swiftCode}
              onChange={handleChange}
              required
              maxLength={11}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none uppercase"
            />
            {errors.swiftCode && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.swiftCode}
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              8-11 alphanumeric characters (e.g., ABCDUS33XXX)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pay Now
              </>
            )}
          </button>
        </form>

        {/* Security Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Secure Transaction</p>
              <p className="text-blue-700">All payments are encrypted and processed through secure channels. Your transaction will be verified before processing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;