<template>
      <!-- Preloader -->
      <div v-if="loading">
      <Loader />
    </div>
  <div class="key-container">
    <h1>Key Information Documents (KIDs)</h1>
    <p>The Key Information Document (KID) provides you with key information about a specific investment product. It is not marketing material. The information is required by law to help you understand the nature, risks, costs, potential gains and losses of this product and to help you compare it with other products.</p>

    <h2>Fintastical (Europe) Ltd KIDs – CFD</h2>
    <ul>
        <li><a href="#">Commodity CFD Download</a></li>
        <li><a href="#">Cryptoasset CFD Download</a></li>
        <li><a href="#">ETF CFD Download</a></li>
        <li><a href="#">FX CFD Download</a></li>
        <li><a href="#">Interest Rates and Bonds CFD Download</a></li>
        <li><a href="#">Single Stock CFD Download</a></li>
        <li><a href="#">Stock Index CFD Download</a></li>
    </ul>

    <h2>Fintastical (UK) Ltd KIDs CFD</h2>
    <ul>
        <li><a href="#">Commodity CFD Download</a></li>
        <li><a href="#">Cryptoasset CFD Download</a></li>
        <li><a href="#">ETF CFD Download</a></li>
        <li><a href="#">FX CFD Download</a></li>
        <li><a href="#">Interest Rates and Bonds CFD Download</a></li>
        <li><a href="#">Single Stock CFD Download</a></li>
        <li><a href="#">Stock Index CFD Download</a></li>
    </ul>

    <h2>Real ETFs KIDs for Fintastical (Europe) Ltd and Fintastical (UK) Ltd</h2>
    <ul>
        <li><a href="#">iShares FTSE 250 UCITS ETF Download</a></li>
        <li><a href="#">iShares NASDAQ 100 UCITS ETF Download</a></li>
        <li><a href="#">iShares Core S&P 500 UCITS ETF Download</a></li>
        <li><a href="#">Xtrackers MSCI Europe Utilities ESG Screened UCITS ETF Download</a></li>
        <li><a href="#">Xtrackers Nikkei 225 UCITS ETF Download</a></li>
        <li><a href="#">Xtrackers MSCI India Swap UCITS ETF Download</a></li>
        <li><a href="#">SPDR S&P 500 UCITS ETF Download</a></li>
        <li><a href="#">SPDR S&P US Dividend Aristocrats UCITS ETF Download</a></li>
        <li><a href="#">iShares $ Corporate Bond UCITS ETF Download</a></li>
        <li><a href="#">iShares AEX UCITS ETF Download</a></li>
    </ul>

    <h2>Futures KIDs for Fintastical (Europe) Ltd and Fintastical (UK) Ltd</h2>
    <ul>
        <li><a href="#">Futures KID 1 Download</a></li>
        <li><a href="#">Futures KID 2 Download</a></li>
        <li><a href="#">Futures KID 3 Download</a></li>
    </ul>


  </div>
</template>
<script setup>
import Loader from "@/components/LoaderComp.vue"
</script>

<style scoped>
.key-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}
</style>
