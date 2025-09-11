import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DummyUpiCheckout = () => {
  const [upiDetails, setUpiDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const fetchUpiDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dummy-upi/generate-upi-qr');
        setUpiDetails(response.data);
      } catch (error) {
        console.error('Error fetching UPI details:', error);
        setPaymentStatus('Error fetching UPI details.');
      }
    };
    fetchUpiDetails();
  }, []);

  const simulatePayment = async (status) => {
    try {
      const response = await axios.post('http://localhost:8000/api/dummy-upi/simulate-payment', { status });
      setPaymentStatus(response.data.message);
    } catch (error) {
      console.error('Error simulating payment:', error);
      setPaymentStatus(error.response?.data?.message || 'Payment simulation failed.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h2>Dummy UPI Payment</h2>
      {upiDetails ? (
        <div>
          <p><strong>UPI ID:</strong> {upiDetails.upiId}</p>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            border: '1px solid #ccc', 
            margin: '10px auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#f0f0f0', 
            color: '#555', 
            fontSize: '12px', 
            textAlign: 'center' 
          }}>
            [QR Code would be here]
          </div>
          <p>{upiDetails.message}</p>
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => simulatePayment('success')}
              style={{ 
                padding: '10px 20px', 
                marginRight: '10px', 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Simulate Successful Payment
            </button>
            <button 
              onClick={() => simulatePayment('failure')}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Simulate Failed Payment
            </button>
          </div>
        </div>
      ) : (
        <p>Loading UPI details...</p>
      )}
      {paymentStatus && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{paymentStatus}</p>}
    </div>
  );
};

export default DummyUpiCheckout;
