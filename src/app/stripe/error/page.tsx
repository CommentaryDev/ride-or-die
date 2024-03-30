import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Error in Placing Order</h1>
      <p className="text-lg text-gray-600 mb-8">Sorry, there was an error while processing your order.</p>
    </div>
  );
};

export default ErrorPage;
