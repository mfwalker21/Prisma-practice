const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
const app = express();


app.use(cors());
app.use(express.json());


app.get('/api/artists', async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        albums: {
          include: {
            tracks: true,
          },
        },
      },
    });
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(5555, () => {
  console.log('Server is running on http://localhost:5555');
});


