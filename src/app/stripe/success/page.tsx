import React from "react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-600 mb-8">Thank you for your order.</p>
      <p className="text-lg text-gray-600 mb-8">An email has been sent to confirm your order, check your inbox</p>
    </div>
  );
};

export default SuccessPage;
