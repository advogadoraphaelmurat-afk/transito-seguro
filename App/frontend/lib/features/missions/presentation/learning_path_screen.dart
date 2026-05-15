import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/models.dart';
import '../../../core/providers.dart';
import 'mission_router.dart';
import 'mission_screen.dart';

class LearningPathScreen extends ConsumerWidget {
  final Volume volume;

  const LearningPathScreen({super.key, required this.volume});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final primaryColor = authState.currentGrade != null && authState.currentGrade! < 6 
        ? Colors.orange 
        : Colors.green;

    return Scaffold(
      appBar: AppBar(
        title: Text(volume.title),
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
      ),
      body: volume.modules.isEmpty
          ? const Center(child: Text('Nenhum bimestre cadastrado.'))
          : ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 24),
              itemCount: volume.modules.length,
              itemBuilder: (context, index) {
                final module = volume.modules[index];
                return _BimesterSection(
                  module: module,
                  primaryColor: primaryColor,
                );
              },
            ),
    );
  }
}

class _BimesterSection extends StatelessWidget {
  final Module module;
  final Color primaryColor;

  const _BimesterSection({
    required this.module,
    required this.primaryColor,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
          child: Text(
            '${module.bimonthly}º Bimestre: ${module.title}',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: primaryColor.withOpacity(0.8),
            ),
          ),
        ),
        SizedBox(
          height: 140,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: module.missions.length,
            itemBuilder: (context, index) {
              final mission = module.missions[index];
              return _MissionNode(
                mission: mission,
                primaryColor: primaryColor,
              );
            },
          ),
        ),
        const Divider(height: 40),
      ],
    );
  }
}

class _MissionNode extends StatelessWidget {
  final Mission mission;
  final Color primaryColor;

  const _MissionNode({
    required this.mission,
    required this.primaryColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      margin: const EdgeInsets.symmetric(horizontal: 8),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              // Pedagogical Logic: Check if module (week) is unlocked by teacher
              final isUnlocked = true; // TODO: Implement backend check
              
              if (!isUnlocked) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Esta semana ainda não foi liberada pelo seu professor!')),
                );
                return;
              }

              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => MissionRouter(mission: mission),
                ),
              );
            },

            borderRadius: BorderRadius.circular(50),
            child: Container(
              height: 74,
              width: 74,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    primaryColor.withOpacity(0.9),
                    primaryColor,
                  ],
                ),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: primaryColor.withOpacity(0.4),
                    blurRadius: 12,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Center(
                child: Icon(
                  _getIconForType(mission.type),
                  color: Colors.white,
                  size: 32,
                ),
              ),
            ),

          ),
          const SizedBox(height: 8),
          Text(
            mission.title,
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
          ),
          Text(
            'Tarefa ${mission.order}',
            style: TextStyle(fontSize: 10, color: Colors.grey.shade600),
          ),
        ],
      ),
    );
  }

  IconData _getIconForType(MissionType type) {
    switch (type) {
      case MissionType.quiz:
        return Icons.quiz;
      case MissionType.simulation:
        return Icons.videogame_asset;
      case MissionType.interactive:
        return Icons.touch_app;
      case MissionType.task:
        return Icons.edit_note;
    }
  }
}
