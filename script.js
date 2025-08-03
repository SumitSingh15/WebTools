document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the DOM
    const generateBtn = document.getElementById('generate-btn');
    const colorCountInput = document.getElementById('color-count');
    const paletteDisplay = document.getElementById('palette-display');

    // Function to generate the palette
    const generatePalette = () => {
        // 1. Get the number of colors from the input
        const count = parseInt(colorCountInput.value, 10);
        
        // Clear the previous palette
        paletteDisplay.innerHTML = '';

        // 2. Generate a random starting point on the color wheel (0 to 360)
        const startHue = Math.floor(Math.random() * 360);
        // Calculate the angle to step by for each color
        const hueStep = 360 / count;

        // 3. Create each color swatch
        for (let i = 0; i < count; i++) {
            const hue = (startHue + i * hueStep) % 360;
            // We use fixed saturation and lightness for harmony
            const saturation = 75;
            const lightness = 60;

            const hexColor = hslToHex(hue, saturation, lightness);

            // Create the div for the color swatch
            const swatch = document.createElement('div');
            swatch.classList.add('color-swatch');
            swatch.style.backgroundColor = hexColor;

            // Create the span for the hex code
            const hexCode = document.createElement('span');
            hexCode.classList.add('hex-code');
            hexCode.textContent = hexColor;

            // 4. Add the copy-on-click functionality
            hexCode.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent swatch hover effect from triggering
                navigator.clipboard.writeText(hexColor).then(() => {
                    hexCode.textContent = 'Copied!';
                    setTimeout(() => {
                        hexCode.textContent = hexColor;
                    }, 1000); // Revert back after 1 second
                });
            });

            swatch.appendChild(hexCode);
            paletteDisplay.appendChild(swatch);
        }
    };

    // --- Helper Function to Convert HSL to HEX ---
    // This is a standard conversion formula.
    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    // Event listener for the button
    generateBtn.addEventListener('click', generatePalette);

    // Generate a default palette when the page loads
    generatePalette();
});
