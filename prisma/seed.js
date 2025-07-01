const { PrismaClient } = require('@prisma/client'); 
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    const artist = await prisma.artist.create({
      data: {
        name: faker.music.artist(),
        genre: faker.music.genre(),
        albums: {
          create: Array.from({ length: 2 }).map(() => ({
            title: faker.music.album(),
            year: faker.number.int({ min: 1990, max: 2024 }),
            tracks: {
              create: Array.from({ length: 3 }).map(() => ({
                title: faker.music.songName(),
                duration: faker.number.int({ min: 120, max: 360 }),
              })),
            },
          })),
        },
      },
    });

    console.log(`Created artist: ${artist.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
