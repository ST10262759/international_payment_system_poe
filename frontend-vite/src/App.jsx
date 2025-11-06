import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import CreatePayment from "./components/CreatePayment.jsx";
import PaymentList from "./components/PaymentList.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 shadow-md">
                  <span className="text-white text-xl font-bold">💸</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PayPortal
                </span>
              </Link>

              {/* Navigation */}
              <nav className="flex items-center space-x-1">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/create-payment"
                      className="px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      New Payment
                    </Link>
                    <Link
                      to="/payments"
                      className="px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      Payments
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="ml-2 px-4 py-2 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      Logout
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center py-20">
                  <div className="inline-block p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl mb-6 transform hover:scale-105 transition-transform duration-300">
                    <span className="text-6xl">💸</span>
                  </div>
                  <h1 className="text-5xl font-bold text-slate-800 mb-4">
                    Welcome to PayPortal
                  </h1>
                  <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    Your secure gateway to international payments. Fast, reliable, and compliant.
                  </p>
                  {!isLoggedIn && (
                    <div className="flex justify-center space-x-4">
                      <Link
                        to="/register"
                        className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold border-2 border-blue-600"
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/login"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              }
            />

            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/create-payment" /> : <Register setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/create-payment" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route
              path="/create-payment"
              element={isLoggedIn ? <CreatePayment /> : <Navigate to="/login" />}
            />
            <Route
              path="/payments"
              element={isLoggedIn ? <PaymentList /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-slate-600">
              <p className="text-sm">
                © 2024 PayPortal. Secure international payment processing.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;