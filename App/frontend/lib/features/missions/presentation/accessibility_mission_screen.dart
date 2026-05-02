import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/models.dart';

class AccessibilityMissionScreen extends ConsumerStatefulWidget {
  final Mission mission;

  const AccessibilityMissionScreen({super.key, required this.mission});

  @override
  ConsumerState<AccessibilityMissionScreen> createState() => _AccessibilityMissionScreenState();
}

class _AccessibilityMissionScreenState extends ConsumerState<AccessibilityMissionScreen> {
  int _step = 0;
  final List<bool> _placements = [false, false, false];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cidade para Todos')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Expanded(child: _buildContent()),
            _buildAction(),
          ],
        ),
      ),
    );
  }

  Widget _buildContent() {
    if (_step == 0) return _buildIntro();
    if (_step == 1) return _buildPlaning();
    return _buildConclusion();
  }

  Widget _buildIntro() {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.accessible, size: 80, color: Colors.blue),
        SizedBox(height: 24),
        Text('Desenho Universal', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        SizedBox(height: 16),
        Text(
          'Rafael percebeu que uma calçada sem rampa é um muro para quem usa cadeira de rodas. Vamos ajudar a planejar uma rua acessível?',
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildPlaning() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('Toque nos locais corretos para instalar as rampas:', style: TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 40),
        Stack(
          children: [
            Container(
              height: 300,
              width: double.infinity,
              decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(12)),
              child: const Center(child: Text('ESQUINA DA RUA', style: TextStyle(color: Colors.grey))),
            ),
            // Interaction points
            Positioned(
              bottom: 20, left: 50,
              child: _buildSpot(0),
            ),
            Positioned(
              bottom: 20, right: 50,
              child: _buildSpot(1),
            ),
            Positioned(
              top: 50, left: 150,
              child: _buildSpot(2),
            ),
          ],
        ),
        const SizedBox(height: 20),
        Text('${_placements.where((p) => p).length}/3 rampas instaladas', style: const TextStyle(fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildSpot(int index) {
    return GestureDetector(
      onTap: () => setState(() => _placements[index] = true),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: _placements[index] ? Colors.green : Colors.red.withOpacity(0.5),
          shape: BoxShape.circle,
        ),
        child: Icon(_placements[index] ? Icons.check : Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _buildConclusion() {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.volunteer_activism, size: 80, color: Colors.pink),
        SizedBox(height: 24),
        Text('Mobilidade Inclusiva!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        SizedBox(height: 16),
        Text(
          'Rafael aprendeu que uma cidade boa para quem tem deficiência é uma cidade melhor para todos.',
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 32),
        Text('+100 XP', style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold, fontSize: 24)),
      ],
    );
  }

  Widget _buildAction() {
    return ElevatedButton(
      onPressed: () {
        if (_step == 1 && _placements.contains(false)) return;
        if (_step < 2) setState(() => _step++);
        else Navigator.of(context).pop();
      },
      style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
      child: Text(_step == 2 ? 'Concluir' : 'Continuar'),
    );
  }
}
