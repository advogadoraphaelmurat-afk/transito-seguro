const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Teacher and Class...');

  // Create a School
  const school = await prisma.school.upsert({
    where: { id: 'school-1' },
    update: {},
    create: {
      id: 'school-1',
      name: 'Colégio Estadual Rio de Janeiro',
      location: 'Centro, RJ',
    },
  });

  // Create a Teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'professor@educacao.rj.gov.br' },
    update: {},
    create: {
      name: 'Prof. João Silva',
      email: 'professor@educacao.rj.gov.br',
      password: 'password123', // In production, this should be hashed
      role: 'TEACHER',
      schoolId: school.id,
    },
  });

  // Create a Class
  const classObj = await prisma.class.upsert({
    where: { id: 'class-6a' },
    update: {},
    create: {
      id: 'class-6a',
      name: '6º Ano A',
      schoolId: school.id,
      teacherId: teacher.id,
    },
  });

  // Create some Students
  const students = [
    { name: 'Ana Oliveira', email: 'ana@estudante.rj.gov.br', grade: 6 },
    { name: 'Bruno Santos', email: 'bruno@estudante.rj.gov.br', grade: 6 },
    { name: 'Carla Lima', email: 'carla@estudante.rj.gov.br', grade: 6 },
  ];

  for (const s of students) {
    const student = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        name: s.name,
        email: s.email,
        password: 'password123',
        role: 'STUDENT',
        currentGrade: s.grade,
        schoolId: school.id,
      },
    });

    // Add student to class
    await prisma.class.update({
      where: { id: classObj.id },
      data: {
        students: {
          connect: { id: student.id }
        }
      }
    });

    // Add some random progress for testing
    // Let's find missions for Vol 3 (6th Grade)
    const missions = await prisma.mission.findMany({
      where: {
        module: {
          volumeId: 3,
          bimonthly: 1
        }
      },
      take: 4
    });

    for (let i = 0; i < Math.floor(Math.random() * missions.length); i++) {
      await prisma.studentProgress.upsert({
        where: {
          userId_missionId: {
            userId: student.id,
            missionId: missions[i].id
          }
        },
        update: {},
        create: {
          userId: student.id,
          missionId: missions[i].id,
          completed: true,
          score: 80 + Math.random() * 20
        }
      });
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
