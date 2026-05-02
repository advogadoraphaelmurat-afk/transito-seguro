const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Daily Challenges...');

  const challenges = [
    {
      title: 'Dica do Dia: Ponto Cego',
      description: 'Lembre-se: se você não vê o motorista pelo retrovisor dele, ele também não te vê! Qual o nome dessa área?',
      type: 'QUIZ',
      content: JSON.stringify({
        question: 'Área onde o motorista não consegue enxergar pelo retrovisor:',
        options: ['Zona Segura', 'Ponto Cego', 'Vácuo', 'Linha de Visão'],
        correctIndex: 1
      }),
      rewardXp: 20,
      rewardCoins: 10
    },
    {
      title: 'Checklist de Segurança',
      description: 'Antes de sair de casa, verifique se seu calçado está firme nos pés. Sandálias soltas podem prender nos pedais!',
      type: 'INFO',
      rewardXp: 10,
      rewardCoins: 5
    }
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < challenges.length; i++) {
    const c = challenges[i];
    const challengeDate = new Date(today);
    challengeDate.setDate(today.getDate() + i); // Spread challenges over days

    await prisma.dailyChallenge.upsert({
      where: { date: challengeDate },
      update: c,
      create: {
        date: challengeDate,
        ...c
      }
    });
  }


  console.log('Challenges seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
