import React from 'react';
import { PayPalButton } from '@paypal/react-paypal-js';
import { axiosInstance } from 'axios.config';

function CheckoutButton() {
  

  return (
    <PayPalButton
      clientId={process.env.PAYPAL_CLIENT_ID}
      onSuccess={handleSuccess}
      onError={handleError}
      onApprove={handleApprove}
      amount="10.00"
      currency="USD"
    />
  );
}

export default CheckoutButton;
