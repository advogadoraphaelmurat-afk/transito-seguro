const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding granular tasks for all volumes...');

  const volumesData = [
    { id: 1, title: 'O Trânsito Começa em Mim', cycle: 'INTERDISCIPLINAR', 
      bimesters: ['O Trânsito Começa em Mim', 'Vejo, Entendo, Obedeço', 'Rodas e Segurança', 'Meu Bairro é um Lugar de Todos'] },
    { id: 2, title: 'A Grande Investigação das Ruas', cycle: 'INTERDISCIPLINAR', 
      bimesters: ['Por que as Pessoas se Machucam?', 'Duas Rodas no Mundo', 'O Celular e a Atenção', 'Somos Agentes de Mudança'] },
    { id: 3, title: 'A Cidade Que Ninguém Vê', cycle: 'INTERDISCIPLINAR', 
      bimesters: ['Os Números que o Brasil Esconde', 'Motos: Mobilidade ou Epidemia?', 'Quem Tem Direito ao Espaço Urbano?', 'Tribunal do Trânsito'] },
    { id: 4, title: 'Física do Impacto', cycle: 'AUTORAL', 
      bimesters: ['Energia Cinética', 'Distância de Frenagem', 'Força G e o Corpo', 'Projeto: Simulador de Impacto'] },
    { id: 5, title: 'Cidade para Todos', cycle: 'AUTORAL', 
      bimesters: ['Mobilidade Inclusiva', 'Desenho Universal', 'Barreiras Arquitetônicas', 'Projeto: Mapeando a Acessibilidade'] },
    { id: 6, title: 'Álcool e Direção', cycle: 'AUTORAL', 
      bimesters: ['O Tempo de Reação', 'Fisiologia e Álcool', 'Estatísticas da Lei Seca', 'Projeto: Conscientização'] },
    { id: 7, title: 'Direitos e Deveres no CTB', cycle: 'ENSINO_MEDIO', 
      bimesters: ['O Código de Trânsito', 'Infrações e Penalidades', 'O Papel do Cidadão', 'Júri Simulado'] },
    { id: 8, title: 'A Cidade que Adoece', cycle: 'ENSINO_MEDIO', 
      bimesters: ['Poluição e Saúde', 'Impacto Ambiental', 'Indústria e Lobby', 'Projeto: Sustentabilidade'] },
    { id: 9, title: 'Mobilidade Sustentável', cycle: 'ENSINO_MEDIO', 
      bimesters: ['Transporte Público', 'Modais Ativos', 'Cidades Inteligentes', 'Plano de Mobilidade Escolar'] },
  ];

  await prisma.mission.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.volume.deleteMany({});

  for (const v of volumesData) {
    const volume = await prisma.volume.create({
      data: {
        id: v.id,
        title: v.title,
        cycle: v.cycle,
      },
    });

    for (let i = 0; i < v.bimesters.length; i++) {
      const bNum = i + 1;
      const bTitle = v.bimesters[i];
      
      const module = await prisma.module.create({
        data: {
          volumeId: volume.id,
          bimonthly: bNum,
          title: bTitle,
        },
      });

      // 8 Tasks per Bimester
      for (let t = 1; t <= 8; t++) {
        let type = 'TASK';
        if (t === 1) type = 'VIDEO';
        if (t === 2 || t === 4) type = 'INTERACTIVE';
        if (t === 3 || t === 8) type = 'QUIZ';

        await prisma.mission.create({
          data: {
            moduleId: module.id,
            order: t,
            title: `Tarefa ${t} - ${bTitle}`,
            type: type,
            description: `Atividade prática e reflexiva sobre o tema do bimestre.`,
            xpReward: 10,
            coinsReward: 5,
            contentData: JSON.stringify({}),
          }
        });
      }
    }
  }

  console.log('Seed JS completed successfully for all 9 volumes.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
