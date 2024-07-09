require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const colorNameList = require('color-name-list');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin:  ['https://styleup-ai.onrender.com', 'http://localhost:3000'], 
    methods: 'GET,POST',
    credentials: true
}));

app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Function to convert hex color to color name
function hexToColorName(hex) {
    const color = colorNameList.find(color => color.hex.toLowerCase() === hex.toLowerCase());
    return color ? color.name : hex; // Return the hex code if no name is found
}

// Function to process the recommendation response
function processRecommendation(recommendation) {
    // Remove markdown symbols and extract sections
    let processed = recommendation.replace(/##/g, '').replace(/\*\*/g, '');

    // Replace hex color codes with color names
    processed = processed.replace(/#([0-9a-fA-F]{6})/g, (match, hex) => {
        return hexToColorName(`#${hex}`);
    });

    // Extract and format sections
    const outfitMatch = processed.match(/Outfit Recommendation:(.*?)(?=Alternatives:|$)/s);
    const alternativesMatch = processed.match(/Alternatives:(.*?)(?=Message:|$)/s);
    const messageMatch = processed.match(/Message:(.*)/s);

    const outfit = outfitMatch ? outfitMatch[1].trim() : 'No specific outfit recommendation found.';
    const alternatives = alternativesMatch ? alternativesMatch[1].trim() : 'No alternatives provided.';
    const message = messageMatch ? messageMatch[1].trim() : 'No message provided.';

    return {
        outfit,
        alternatives,
        message
    };
}

app.post('/recommend', async (req, res) => {
    const { event, gender, complexion, country, clothes } = req.body;
    const clothesList = clothes.map(c => `${c.item} (${c.type}, ${c.color})`).join(', ');

    const prompt = `Suggest an outfit for a ${gender} attending a ${event} in ${country} with a ${complexion} complexion. Consider the following clothes: ${clothesList}. Provide the recommendation point-wise without any explanation. At the end, suggest some alternatives and include a brief message for the user.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let recommendation = await response.text();

        // Process the recommendation
        const processedRecommendation = processRecommendation(recommendation);

        res.json(processedRecommendation);
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        res.status(500).json({ error: 'Error fetching recommendation' });
    }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Serve the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
