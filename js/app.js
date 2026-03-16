// PersonalVault - Order Handling
// This file handles the Razorpay payment flow and order processing

// Configuration
const CONFIG = {
    razorpayKeyId: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay key
    apiBaseUrl: '/api', // Your backend API endpoint
    price: {
        earlyBird: 13000,  // ₹13,000
        standard: 15000     // ₹15,000
    }
};

// Initialize Razorpay
function initRazorpay() {
    return {
        key: CONFIG.razorpayKeyId,
        currency: 'INR',
        theme: {
            color: '#1A73E8'
        }
    };
}

// Create payment order
async function createOrder(customerData) {
    try {
        const response = await fetch(`${CONFIG.apiBaseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: 'personalvault-standard',
                price: CONFIG.price.earlyBird,
                customer: customerData
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

// Open Razorpay checkout
function openCheckout(orderData) {
    const options = {
        key: CONFIG.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PersonalVault',
        description: 'PersonalVault Standard - 1TB',
        order_id: orderData.id,
        image: '/logo.png',
        prefill: {
            name: orderData.customer.name || '',
            email: orderData.customer.email || '',
            contact: orderData.customer.phone || ''
        },
        notes: {
            product: 'personalvault-standard',
            variant: '1TB'
        },
        theme: {
            color: '#1A73E8'
        },
        handler: function(response) {
            // Payment successful
            handlePaymentSuccess(response, orderData);
        },
        modal: {
            ondismiss: function() {
                console.log('Payment modal dismissed');
                // Handle modal close
            }
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

// Handle successful payment
async function handlePaymentSuccess(paymentResponse, orderData) {
    try {
        // Verify payment with your server
        const verifyResponse = await fetch(`${CONFIG.apiBaseUrl}/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                order_id: orderData.id
            })
        });

        const result = await verifyResponse.json();

        if (result.success) {
            // Show success message and redirect
            window.location.href = '/success.html?order=' + orderData.id;
        } else {
            alert('Payment verification failed. Please contact support.');
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        alert('Payment successful but verification failed. Please contact support.');
    }
}

// Pre-order form handler
function handlePreOrder(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        pincode: document.getElementById('pincode').value
    };

    // Show loading state
    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="material-icons">hourglass_empty</span> Processing...';
    btn.disabled = true;

    // Create order and open checkout
    createOrder(formData)
        .then(orderData => {
            openCheckout(orderData);
        })
        .catch(error => {
            console.error('Order error:', error);
            alert('Error creating order. Please try again.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
}

// Waitlist form handler
async function handleWaitlist(event) {
    event.preventDefault();

    const email = document.getElementById('waitlist-email').value;

    try {
        const response = await fetch(`${CONFIG.apiBaseUrl}/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (data.success) {
            alert('You\'re on the waitlist! We\'ll notify you when pre-orders open.');
            document.getElementById('waitlist-form').reset();
        } else {
            alert('Error joining waitlist. Please try again.');
        }
    } catch (error) {
        console.error('Waitlist error:', error);
        alert('Error joining waitlist. Please try again.');
    }
}

// Export functions for use in HTML
window.PersonalVault = {
    initRazorpay,
    createOrder,
    openCheckout,
    handlePreOrder,
    handleWaitlist
};
