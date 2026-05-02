import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/models.dart';
import '../../../core/providers.dart';

class TeacherDashboardScreen extends ConsumerWidget {
  const TeacherDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final classesAsync = ref.watch(teacherClassesProvider);
    final authState = ref.watch(authProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Painel do Professor'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              ref.read(authProvider.notifier).logout();
              Navigator.of(context).pop();
            },
          ),
        ],
      ),
      body: classesAsync.when(
        data: (classes) => ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: classes.length,
          itemBuilder: (context, index) {
            final classInfo = classes[index];
            return Card(
              child: ListTile(
                title: Text(classInfo.name),
                subtitle: Text('${classInfo.students.length} estudantes'),
                trailing: const Icon(Icons.analytics),
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => ClassDetailScreen(classId: classInfo.id, className: classInfo.name),
                    ),
                  );
                },
              ),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Erro: $err')),
      ),
    );
  }
}

class ClassDetailScreen extends ConsumerWidget {
  final String classId;
  final String className;

  const ClassDetailScreen({super.key, required this.classId, required this.className});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final progressAsync = ref.watch(classProgressProvider(classId));

    return Scaffold(
      appBar: AppBar(
        title: Text('Progresso: $className'),
      ),
      body: progressAsync.when(
        data: (classInfo) => SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: SingleChildScrollView(
            child: DataTable(
              columnSpacing: 20,
              columns: [
                const DataColumn(label: Text('Estudante')),
                ...List.generate(32, (index) => DataColumn(
                  label: Text('S${index + 1}', style: const TextStyle(fontSize: 10)),
                )),
              ],
              rows: classInfo.students.map((student) {
                return DataRow(
                  cells: [
                    DataCell(Text(student.name)),
                    ...List.generate(32, (index) {
                      // Check if student completed task for week index+1
                      // We need to map mission order/bimester to the 1-32 index
                      final isCompleted = student.progress?.any((p) {
                        // Assuming tasks are ordered 1-8 per bimester
                        // Week = (Bimester - 1) * 8 + Order
                        final week = ((p.mission?.order ?? 1) + ((p.mission?.contentData['bimonthly'] ?? 1) - 1) * 8);
                        return week == (index + 1) && p.completed;
                      }) ?? false;

                      return DataCell(
                        Icon(
                          isCompleted ? Icons.check_circle : Icons.radio_button_unchecked,
                          color: isCompleted ? Colors.green : Colors.grey,
                          size: 16,
                        ),
                      );
                    }),
                  ],
                );
              }).toList(),
            ),
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Erro: $err')),
      ),
    );
  }
}
