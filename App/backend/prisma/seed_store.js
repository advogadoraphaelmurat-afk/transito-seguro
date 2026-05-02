const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Store Items...');

  const items = [
    // HATS
    { name: 'Capacete de Ciclista Azul', price: 150, category: 'AVATAR_HAT', imageUrl: 'hat_bike_blue.png' },
    { name: 'Boné Cidade Viva', price: 50, category: 'AVATAR_HAT', imageUrl: 'hat_cap_city.png' },
    { name: 'Capacete Profissional Moto', price: 500, category: 'AVATAR_HAT', imageUrl: 'hat_moto_pro.png' },
    
    // SHIRTS
    { name: 'Camiseta Vision Zero', price: 100, category: 'AVATAR_SHIRT', imageUrl: 'shirt_vision_zero.png' },
    { name: 'Colete Refletivo', price: 200, category: 'AVATAR_SHIRT', imageUrl: 'shirt_reflective.png' },
    { name: 'Jaqueta de Couro Pro', price: 800, category: 'AVATAR_SHIRT', imageUrl: 'shirt_leather.png' },
    
    // VEHICLES (Visual only for avatar)
    { name: 'Bicicleta Urbana Elétrica', price: 1200, category: 'AVATAR_VEHICLE', imageUrl: 'vehicle_bike_electric.png' },
    { name: 'Patinete de Aluguel', price: 300, category: 'AVATAR_VEHICLE', imageUrl: 'vehicle_scooter.png' },
    { name: 'Moto 150cc Custom', price: 2500, category: 'AVATAR_VEHICLE', imageUrl: 'vehicle_moto_150.png' },
  ];

  for (const item of items) {
    await prisma.item.upsert({
      where: { id: item.name.toLowerCase().replace(/ /g, '_') }, // Using name as ID for seeding stability
      update: item,
      create: {
        id: item.name.toLowerCase().replace(/ /g, '_'),
        ...item
      },
    });
  }

  console.log('Store items seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
