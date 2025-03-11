<template>
  <div class="why-choose-fintastical">
    <h1>Why Choose Fintastical?</h1>
    <p>
      At Fintastical, we are committed to providing you with the best financial tools and resources to help you achieve your goals. Here are a few reasons why you should choose us:
    </p>

    <!-- FAQ Section -->
  <div class="faq">
    <h2>Frequently Asked Questions (FAQ)</h2>

    <details>
      <summary>What is Fintastical and how does it work?</summary>
      <p>Fintastical is a financial management platform that helps you track your expenses, set financial goals, and make smarter money decisions through a user-friendly interface.</p>
    </details>

    <details>
      <summary>Is Fintastical free to use?</summary>
      <p>Yes! Fintastical offers a free plan with essential features. We also have a premium version with additional tools for deeper financial insights.</p>
    </details>

    <details>
      <summary>How can I connect my bank account?</summary>
      <p>You can securely connect your bank account through our encrypted API integration. Simply go to 'Settings' > 'Bank Connections' and follow the guided steps.</p>
    </details>

    <details>
      <summary>How do I earn rewards in Fintastical?</summary>
      <p>Earn rewards by completing financial challenges, saving money, and reaching your goals. These rewards can be redeemed for discounts or premium features.</p>
    </details>

    <details>
      <summary>Is my financial data secure?</summary>
      <p>Yes! We use bank-level encryption and two-factor authentication (2FA) to protect your personal and financial data.</p>
    </details>

    <details>
      <summary>Can I use Fintastical without linking my bank account?</summary>
      <p>Absolutely! You can manually input your transactions and still take advantage of most features, such as goal tracking and budgeting tools.</p>
    </details>

    <details>
      <summary>Can I use Fintastical if I have multiple bank accounts?</summary>
      <p>es! You can connect multiple bank accounts to Fintastical and track all your finances in one place.</p>
    </details>
    
    <details>
      <summary>Does Fintastical sell my financial data?</summary>
      <p>No, we respect your privacy. Your data is never sold or shared with third parties without your explicit consent.</p>
    </details>

    <details>
      <summary>How does Fintastical protect my financial information?</summary>
      <p>We use bank-level encryption, two-factor authentication (2FA), and secure API connections to ensure your data is safe.</p> 
    </details>
    
     <details>
      <summary>Can I use Fintastical offline?</summary>
      <p>Some features, like manual transaction entry, are available offline. However, for real-time updates and bank syncing, an internet connection is required.</p> 
     </details>

     

  </div>
  </div>
</template>

<script>
export default {
  name: 'WhyChooseFintastical'
}
</script>

<style scoped>
.why-choose-fintastical {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #2F284C;
  text-align: center;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  background-color: var(--purple-light);
  padding: 1rem;
  border-radius: 1rem;
}
.faq {
  text-align: center;
}

details {
  margin: 10px 0px;
}

summary{
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 1rem;
}


</style>
