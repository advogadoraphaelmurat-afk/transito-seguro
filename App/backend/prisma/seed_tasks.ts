import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding granular tasks...');

  // 1. Create Volume 1
  const vol1 = await prisma.volume.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'O Trânsito Começa em Mim',
      cycle: 'INTERDISCIPLINAR',
    },
  });

  // 2. Create Bimesters for Vol 1
  const bimesters = [
    { num: 1, title: 'O Trânsito Começa em Mim' },
    { num: 2, title: 'Vejo, Entendo, Obedeço' },
    { num: 3, title: 'Rodas e Segurança' },
    { num: 4, title: 'Meu Bairro é um Lugar de Todos' },
  ];

  for (const b of bimesters) {
    const module = await prisma.module.create({
      data: {
        volumeId: vol1.id,
        bimonthly: b.num,
        title: b.title,
      },
    });

    if (b.num === 1) {
      // 8 Tasks for B1
      const tasks = [
        { order: 1, title: 'A Descoberta de Lucas', type: 'VIDEO', desc: 'Narrativa com Lucas e Dona Marta em Madureira.' },
        { order: 2, title: 'O Trânsito é de Todos', type: 'INTERACTIVE', desc: 'Conceitos de pedestre, passageiro e condutor.' },
        { order: 3, title: 'Quem Sou Eu?', type: 'QUIZ', desc: 'Reflexão sobre seu papel no trajeto escolar.' },
        { order: 4, title: 'Parar, Olhar, Escutar', type: 'INTERACTIVE', desc: 'Prática lúdica da sequência P.O.E.' },
        { order: 5, title: 'Poema da Calçada', type: 'TASK', desc: 'Atividade criativa de Língua Portuguesa.' },
        { order: 6, title: 'Mural de Palavras', type: 'TASK', desc: 'Vocabulário: Pedestre, Via e Cidadania.' },
        { order: 7, title: 'Mapa Sentimental', type: 'INTERACTIVE', desc: 'Mapeamento emocional da rua da escola.' },
        { order: 8, title: 'Como me senti hoje?', type: 'QUIZ', desc: 'Autoavaliação e metacognição.' },
      ];

      for (const t of tasks) {
        await prisma.mission.create({
          data: {
            moduleId: module.id,
            order: t.order,
            title: t.title,
            type: t.type,
            description: t.desc,
            xpReward: 10,
            coinsReward: 5,
            contentData: JSON.stringify({}),
          }
        });
      }
    }
  }

  // 3. Create Volume 8 (A Cidade que Adoece - Ensino Médio)
  const vol8 = await prisma.volume.upsert({
    where: { id: 8 },
    update: {},
    create: {
      id: 8,
      title: 'A Cidade que Adoece',
      cycle: 'ENSINO_MEDIO',
    },
  });

  const bimesters8 = [
    { num: 1, title: 'DIREITO À SAÚDE E TRÂNSITO' },
    { num: 2, title: 'DIREITO AMBIENTAL URBANO E MOBILIDADE SUSTENTÁVEL' },
    { num: 3, title: 'PUBLICIDADE, INDÚSTRIA E MORTES' },
    { num: 4, title: 'O JOVEM COMO SUJEITO DE DIREITOS NO TRÂNSITO' },
  ];

  for (const b of bimesters8) {
    const module = await prisma.module.create({
      data: {
        volumeId: vol8.id,
        bimonthly: b.num,
        title: b.title,
      },
    });

    // Populate Bimester 3 with "Contrapropaganda" Mission for Gamification
    if (b.num === 3) {
      const tasks = [
        { order: 1, title: 'Vendendo Sonhos', type: 'QUIZ', desc: 'Análise de comerciais de automóveis.' },
        { order: 2, title: 'O Jogo Político', type: 'INFO', desc: 'O que é o lobby da indústria automobilística?' },
        { order: 8, title: 'A Contrapropaganda', type: 'INTERACTIVE', desc: 'Desconstrua a mensagem da velocidade e publique sua contrapropaganda.' },
      ];
      for (const t of tasks) {
        await prisma.mission.create({
          data: {
            moduleId: module.id,
            order: t.order,
            title: t.title,
            type: t.type,
            description: t.desc,
            xpReward: t.order === 8 ? 100 : 20,
            coinsReward: t.order === 8 ? 50 : 10,
            contentData: JSON.stringify({
              videoRequired: t.order === 8 ? true : false,
            }),
          }
        });
      }
    }
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
