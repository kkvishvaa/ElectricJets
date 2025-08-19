// Dummy payment handler (Razorpay test mode)
function processPayment(amount, details) {
  // Always return test status
  return { status: 'test', amount, details };
}

export default processPayment;
