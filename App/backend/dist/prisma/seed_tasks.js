"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding granular tasks...');
    const vol1 = await prisma.volume.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            title: 'O Trânsito Começa em Mim',
            cycle: 'INTERDISCIPLINAR',
        },
    });
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
    console.log('Seed completed successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed_tasks.js.map