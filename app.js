// Aplikasi NEWS Gatherer dengan API dari GNEWS
// Created By Peter Raymond Hon

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// GNews API Key
const apikey = ''; // Input API Anda Sendiri

// Setup untuk view engine EJS dan middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Render Halaman Utama
app.get('/', (req, res) => {
    res.render('index', { articles: null, error: null });
});

// Endpoint untuk pencarian berita
app.post('/news', async (req, res) => {
    const query = req.body.location; // Ambil query pencarian dari form
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=10&apikey=${apikey}`;

    try {
        const searchNews = await axios.get(url);

        // Log jika berhasil
        console.log('Pengambilan News API berhasil:', searchNews.data);

        // Mengambil artikel dari respons API
        const articles = searchNews.data.articles;

        // Render halaman dengan data artikel
        res.render('index', {
            title: `Hasil Berita Terkait ${query}`,
            articles: articles,
            error: null 
        });
    } catch (error) {
        console.error('Terjadi Kesalahan Saat mengambil data API:', error.response.data);
        res.render('index', {
            articles: null,
            error: 'Terjadi kesalahan saat mengambil data berita.'
        });
    }
});

app.listen(port, () => {
    console.log(`The News App Listening on port ${port}`);
});
