useEffect(() => {
  const handleCheckoutSuccess = async (sessionId, reference) => {
    try {
      // Pass both sessionId and reference to your backend
      await axios.post(
        `/payments/checkout-success?session_id=${sessionId}&reference=${reference}`,
        {
          sessionId,
          reference,
        }
      );

      clearCart(); // Clear the cart after a successful checkout
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const reference = params.get("reference");

  if (sessionId && reference) {
    handleCheckoutSuccess(sessionId, reference);
  } else {
    setIsProcessing(false);
    setError("Missing session_id or reference in the URL");
  }
}, [clearCart]);
