const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Badges...');

  const badges = [
    {
      id: 'primeiros_passos',
      name: 'Primeiros Passos',
      description: 'Completou sua primeira missão no Trânsito Seguro!',
      iconUrl: 'badge_first_steps.png',
      requirement: JSON.stringify({ missions: 1 })
    },
    {
      id: 'mestre_da_faixa',
      name: 'Mestre da Faixa',
      description: 'Sabe exatamente como e onde atravessar com segurança.',
      iconUrl: 'badge_crosswalk_master.png',
      requirement: JSON.stringify({ category: 'FAIXA', count: 5 })
    },
    {
      id: 'guardiao_da_metropole',
      name: 'Guardião da Metrópole',
      description: 'Concluiu um volume inteiro do projeto!',
      iconUrl: 'badge_volume_master.png',
      requirement: JSON.stringify({ volumeComplete: true })
    }
  ];

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { id: b.id },
      update: b,
      create: b
    });
  }

  console.log('Badges seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
