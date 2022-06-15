/**
 * Creates a checkout payload suitable for test checkouts.
 * 1. Hard-codes the payment values for the Commerce.js test gateway.
 * 2. Hard-codes the email until an email field exists on the checkout form.
 * 3. Gets as much as much checkout info as possible from the checkout form, and uses fallback values.
 */ export function normalizeTestCheckout({ paymentInfo , shippingInfo , shippingOption  }) {
    const firstName = (shippingInfo == null ? void 0 : shippingInfo.firstName) || (paymentInfo == null ? void 0 : paymentInfo.firstName) || "Nextjs";
    const lastName = (shippingInfo == null ? void 0 : shippingInfo.lastName) || (paymentInfo == null ? void 0 : paymentInfo.lastName) || "Commerce";
    const fullName = `${firstName} ${lastName}`;
    const postalCode = (shippingInfo == null ? void 0 : shippingInfo.zipCode) || (paymentInfo == null ? void 0 : paymentInfo.zipCode) || "94103";
    const street = (shippingInfo == null ? void 0 : shippingInfo.streetNumber) || (paymentInfo == null ? void 0 : paymentInfo.streetNumber) || "Test Street";
    const townCity = (shippingInfo == null ? void 0 : shippingInfo.city) || (paymentInfo == null ? void 0 : paymentInfo.city) || "Test Town";
    return {
        payment: {
            gateway: "test_gateway",
            card: {
                number: "4242 4242 4242 4242",
                expiry_month: "01",
                expiry_year: "2024",
                cvc: "123",
                postal_zip_code: postalCode
            }
        },
        customer: {
            email: "nextcommerce@test.com",
            firstname: firstName,
            lastname: lastName
        },
        shipping: {
            name: fullName,
            street,
            town_city: townCity,
            country: "US"
        },
        billing: {
            name: fullName,
            street,
            town_city: townCity,
            postal_zip_code: postalCode,
            county_state: "California",
            country: "US"
        },
        fulfillment: {
            shipping_method: shippingOption
        }
    };
}
