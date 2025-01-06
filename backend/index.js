const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Função auxiliar para fazer requisições HTTP
const fetchData = async (url) => {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`);
    }
    return await response.json();
};

// Endpoint countries list
app.get('/api/countries', async (req, res) => {
    try {
        const data = await fetchData('https://date.nager.at/api/v3/AvailableCountries');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch available countries' });
    }
});

// Endpoint country information
app.get('/api/country/:countryCode', async (req, res) => {
    const { countryCode } = req.params;
    try {
        const countryResponse = await fetchData(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        const populationResponse = await fetchData('https://countriesnow.space/api/v0.1/countries/population');
        const flagResponse = await fetchData('https://countriesnow.space/api/v0.1/countries/flag/images');

        if (!countryResponse) {
            return res.status(404).json({ error: 'Country information not found' });
        }

        const countryPopulation = populationResponse.data?.find(
            (country) => country.code === countryCode || country.iso2 === countryCode
        );

        const countryFlag = flagResponse.data?.find(
            (country) => country.iso2 === countryCode
        );

        const response = {
            countryInfo: countryResponse,
            populationData: countryPopulation
                ? {
                      country: countryPopulation.country,
                      code: countryCode,
                      iso3: countryPopulation.iso3,
                      populationCounts: countryPopulation.populationCounts
                          ?.sort((a, b) => a.year - b.year)
                          .map((count) => ({
                              year: count.year,
                              value: parseInt(count.value, 10),
                          })),
                  }
                : { country: countryCode, code: countryCode, populationCounts: [] },
            flagUrl: countryFlag ? countryFlag.flag : null,
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching country data:', error);
        res.status(500).json({ error: 'Failed to fetch country data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
