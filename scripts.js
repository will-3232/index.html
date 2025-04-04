// JavaScript version of RSA Calculator logic

// Greatest Common Divisor
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Modular Inverse
function modInverse(e, r) {
    for (let d = 2; d < r; d++) {
        if ((d * e) % r === 1) {
            return d;
        }
    }
    return null;
}

// Generate primes between 10 and 99
function getPrimes() {
    let primes = [];
    for (let i = 10; i < 100; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
    }
    return primes;
}

// Generate RSA Keys
function generateKeys() {
    const primes = getPrimes();
    const [p, q] = getTwoRandom(primes);
    const n = p * q;
    const r = (p - 1) * (q - 1);

    const coprimes = [];
    for (let i = 2; i < r; i++) {
        if (gcd(i, r) === 1) {
            coprimes.push(i);
        }
    }

    const e = coprimes[Math.floor(Math.random() * coprimes.length)];
    const d = modInverse(e, r);

    return { p, q, n, e, d };
}

// Pick 2 distinct random numbers from a list
function getTwoRandom(arr) {
    const a = arr[Math.floor(Math.random() * arr.length)];
    let b;
    do {
        b = arr[Math.floor(Math.random() * arr.length)];
    } while (a === b);
    return [a, b];
}

// Encrypt a message
function encrypt(message, e, n) {
    return message.split('').map(char => BigInt(char.charCodeAt(0)) ** BigInt(e) % BigInt(n));
}

// Decrypt a message
function decrypt(cipherArray, d, n) {
    return cipherArray.map(c => String.fromCharCode(Number(BigInt(c) ** BigInt(d) % BigInt(n)))).join('');
}
