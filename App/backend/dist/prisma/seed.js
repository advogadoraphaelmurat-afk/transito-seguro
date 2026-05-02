"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding pedagogical content...');
    const volumes = [
        { id: 1, title: 'O Trânsito Começa em Mim', cycle: client_1.Cycle.INTERDISCIPLINAR },
        { id: 2, title: 'A Grande Investigação das Ruas', cycle: client_1.Cycle.INTERDISCIPLINAR },
        { id: 3, title: 'A Cidade Que Ninguém Vê', cycle: client_1.Cycle.INTERDISCIPLINAR },
        { id: 4, title: 'A Cidade Que Eu Quero Mudar', cycle: client_1.Cycle.AUTORAL },
        { id: 5, title: 'O Preço da Pressa', cycle: client_1.Cycle.AUTORAL },
        { id: 6, title: 'A Cidade Que Eu Vou Herdar', cycle: client_1.Cycle.AUTORAL },
        { id: 7, title: 'A Cidade no Banco dos Réus', cycle: client_1.Cycle.ENSINO_MEDIO },
        { id: 8, title: 'A Cidade que Adoece', cycle: client_1.Cycle.ENSINO_MEDIO },
        { id: 9, title: 'O Peso das Rodas', cycle: client_1.Cycle.ENSINO_MEDIO },
    ];
    for (const v of volumes) {
        await prisma.volume.upsert({
            where: { id: v.id },
            update: {},
            create: v,
        });
    }
    const vol1 = await prisma.volume.findUnique({ where: { id: 1 } });
    if (vol1) {
        const mod1_1 = await prisma.module.create({
            data: {
                volumeId: 1,
                bimonthly: 1,
                title: 'Meus Primeiros Passos',
                missions: {
                    create: [
                        {
                            title: 'O Ponto Cego',
                            type: client_1.MissionType.SIMULATION,
                            xpReward: 50,
                            coinsReward: 20,
                            contentData: {
                                narrative: 'Lucas ajuda o tio a encontrar uma moto invisível no retrovisor.',
                                motorcycleFocus: true,
                                lawReference: 'Art. 244 CTB',
                            },
                        },
                    ],
                },
            },
        });
    }
    const vol3 = await prisma.volume.findUnique({ where: { id: 3 } });
    if (vol3) {
        await prisma.module.create({
            data: {
                volumeId: 3,
                bimonthly: 2,
                title: 'Motos: Mobilidade ou Epidemia?',
                missions: {
                    create: [
                        {
                            title: 'Epidemia sobre Duas Rodas',
                            type: client_1.MissionType.INTERACTIVE,
                            xpReward: 100,
                            coinsReward: 50,
                            contentData: {
                                narrative: 'Rafael investiga os números da crise das motocicletas no Rio.',
                                motorcycleFocus: true,
                                character: 'Rafael',
                            },
                        },
                    ],
                },
            },
        });
    }
    console.log('Seeding completed! 🚦');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map