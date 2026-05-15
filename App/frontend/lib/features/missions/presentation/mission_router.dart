import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/models.dart';
import 'rafael_mission_screen.dart';
import 'crosswalk_mission_screen.dart';
import 'physics_mission_screen.dart';
import 'accessibility_mission_screen.dart';
import 'alcohol_mission_screen.dart';

class MissionRouter extends ConsumerWidget {
  final Mission mission;

  const MissionRouter({super.key, required this.mission});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Dynamic routing based on mission type or contentData
    // For specific high-impact pedagogical missions, we use specialized screens
    
    final missionTitle = mission.title.toLowerCase();

    if (missionTitle.contains('rafael') || missionTitle.contains('ponto cego')) {
      return RafaelInvestigationScreen(mission: mission);
    } else if (missionTitle.contains('faixa') || missionTitle.contains('atravessar')) {
      return CrosswalkMissionScreen(mission: mission);
    } else if (missionTitle.contains('física') || missionTitle.contains('velocidade')) {
      return PhysicsMissionScreen(mission: mission);
    } else if (missionTitle.contains('acessibilidade') || missionTitle.contains('cadeirante')) {
      return AccessibilityMissionScreen(mission: mission);
    } else if (missionTitle.contains('álcool') || missionTitle.contains('bebida')) {
      return AlcoholMissionScreen(mission: mission);
    }

    // Default Fallback: Generic Quiz/Task Screen
    return GenericMissionScreen(mission: mission);
  }
}

class GenericMissionScreen extends StatefulWidget {
  final Mission mission;
  const GenericMissionScreen({super.key, required this.mission});

  @override
  State<GenericMissionScreen> createState() => _GenericMissionScreenState();
}

class _GenericMissionScreenState extends State<GenericMissionScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.mission.title)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.assignment, size: 80, color: Colors.blue),
            const SizedBox(height: 20),
            Text(
              widget.mission.description ?? 'Sem descrição disponível.',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Concluir Tarefa'),
            )
          ],
        ),
      ),
    );
  }
}
