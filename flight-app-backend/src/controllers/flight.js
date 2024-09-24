"use strict";

/* -------------------------------------------------------
    | Havalimanı Node / Express |
------------------------------------------------------- */

const axios = require('axios');

module.exports = {
    list: async (req, res) => {
        try {
            // İstekten gerekli parametreleri al
            const { departureDate, departure, arrival } = req.query;
            
            // Uçuş verilerini almak için başlangıç URL'sini belirle
            let flightsApiURL = 'https://api.schiphol.nl/public-flights/flights';
            
            // Eğer departureDate varsa, URL'yi güncelle
            if (departureDate) {
                if (departure === "AMS") {
                    flightsApiURL = `https://api.schiphol.nl/public-flights/flights?scheduleDate=${departureDate}&route=${arrival}&flightDirection=A`;
                } else {
                    flightsApiURL = `https://api.schiphol.nl/public-flights/flights?scheduleDate=${departureDate}&route=${departure}&flightDirection=D`;
                }
            } // kalkış varış yerlerine göre isteği düzenle
            
            // Havayolu ve destinasyonları almak için API URL'leri
            const airlinesApiURL = 'https://api.schiphol.nl/public-flights/airlines';
            const destinationsApiURL = 'https://api.schiphol.nl/public-flights/destinations';

            // Uçuş verilerini al
            const flightsResponse = await axios.get(flightsApiURL, {
                headers: {
                    'app_id': process.env.SCHIPHOL_APP_ID,
                    'app_key': process.env.SCHIPHOL_APP_KEY,
                    'ResourceVersion': 'v4'
                },
            });

            const flights = flightsResponse.data.flights;

            // Havayolu verilerini almak için paralel istekleri hazırla
            const airlinePromises = flights.map(flight => {
                return axios.get(`${airlinesApiURL}/${flight.prefixIATA}`, {
                    headers: {
                        'app_id': process.env.SCHIPHOL_APP_ID,
                        'app_key': process.env.SCHIPHOL_APP_KEY,
                        'ResourceVersion': 'v4'
                    }
                }).catch(error => {
                    // Havayolu bulunmazsa null döndür
                    if (error.response && error.response.status === 404) {
                        return null;
                    }
                    throw error; // Diğer hatalar için işlemi kes
                });
            });

            // Destinasyon verilerini almak için paralel istekleri hazırla
            const destinationPromises = flights.map(flight => {
                return axios.get(`${destinationsApiURL}/${flight.route.destinations[0]}`, {
                    headers: {
                        'app_id': process.env.SCHIPHOL_APP_ID,
                        'app_key': process.env.SCHIPHOL_APP_KEY,
                        'ResourceVersion': 'v4'
                    }
                }).catch(error => {
                    // Destinasyon bulunmazsa null döndür
                    if (error.response && error.response.status === 404) {
                        console.error(`Destination not found for flight: ${flight.flightNumber}`);
                        return null;
                    }
                    throw error; // Diğer hatalar için işlemi kes
                });
            });

            // Tüm havayolu ve destinasyon verilerini almak için çağrıları bekle
            const [airlineResponses, destinationResponses] = await Promise.all([
                Promise.all(airlinePromises),
                Promise.all(destinationPromises)
            ]);

            // Uçuş verilerini detaylı şekilde formatla
            const detailedFlights = flights.map((flight, index) => {
                const departureLocation = flight.flightDirection === 'D' 
                    ? destinationResponses[index]?.data?.publicName?.english || 'Unknown Departure'
                    : 'Amsterdam';

                const arrivalLocation = flight.flightDirection === 'A' 
                    ? destinationResponses[index]?.data?.publicName?.english || 'Unknown Arrival'
                    : 'Amsterdam';

                const departureAirport = flight.flightDirection === 'D' 
                    ? flight.route.destinations[0] // Gidiş için IATA kodu
                    : 'AMS'; // Amsterdam IATA kodu

                const arrivalAirport = flight.flightDirection === 'A' 
                    ? flight.route.destinations[0] // Varış için IATA kodu
                    : 'AMS'; // Amsterdam IATA kodu

                const airline = airlineResponses[index]?.data?.publicName || 'Unknown Airline';

                return {
                    flightId: flight.id,
                    flightNumber: flight.flightNumber,
                    flightName: flight.flightName,
                    departureLocation: departureLocation,
                    departureAirport: departureAirport,
                    arrivalLocation: arrivalLocation,
                    arrivalAirport: arrivalAirport,
                    departureDateTime: flight.scheduleDateTime,
                    scheduleDate: flight.scheduleDate,
                    arrivalDateTime: flight.estimatedLandingTime || flight.actualLandingTime || "2024-09-23T23:55:00.000+02:00", // bazı verilerde estimatedLandingTime ve actualLandingTime ikisi birden olmadığı için görsellik katması amacıyla statik bir değer oluşturulmuştur
                    airline: airline,
                    tripType: flight.route.eu === 'S' ? 'One Way' : 'Round Trip', // Tek yön veya gidiş-dönüş
                };
            });

            // Yanıtı frontend'e gönderiyoruz
            res.status(200).json({
                error: false,
                data: detailedFlights,
            });

        } catch (error) {
            // Hata detayını logla
            console.error('Error:', error.message);
            res.status(500).json({
                error: true,
                message: 'Bir hata oluştu.',
                details: error.message
            });
        }
    }
};
