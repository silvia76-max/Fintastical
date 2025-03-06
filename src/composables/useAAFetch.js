pullDataAA();

// Here goes the symbols of the companies 
const symbols = ['AAPL', 'NVDA', 'TSLA'];

// Here we put the API KEY
const apikey = '2b69e37d583e41fda6a423e2b07cfdb2';

// Interval can be: 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week, 1month
const interval = '1h'


async function pullDataAA() {
    try {
        const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbols.join(',')}&currency=EUR&interval=${interval}&apikey=${apikey}`);
        if(!response.ok) {
            throw new Error('Error loading data');
        }    
        const data = await response.json();
        console.log(data);
    }    
    catch (error) {
        alert.error('Problem: ', error);
    }    
}    



