import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/models.dart';

class CrosswalkMissionScreen extends ConsumerStatefulWidget {
  final Mission mission;

  const CrosswalkMissionScreen({super.key, required this.mission});

  @override
  ConsumerState<CrosswalkMissionScreen> createState() => _CrosswalkMissionScreenState();
}

class _CrosswalkMissionScreenState extends ConsumerState<CrosswalkMissionScreen> {
  int _step = 0;
  bool _isCarStopped = false;
  bool _crossedSuccessfully = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('O Sinal da Mão')),
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
    switch (_step) {
      case 0:
        return _buildIntro();
      case 1:
        return _buildSimulation();
      case 2:
        return _buildConclusion();
      default:
        return Container();
    }
  }

  Widget _buildIntro() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.front_hand, size: 80, color: Colors.orange),
        const SizedBox(height: 24),
        const Text(
          'O Poder do Olhar',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        const Text(
          'Lucas aprendeu que, antes de atravessar, ele deve estender a mão e SEMPRE fazer contato visual com o motorista. Vamos praticar?',
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildSimulation() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('Toque no botão para "Pedir Passagem" com a mão!'),
        const SizedBox(height: 40),
        Stack(
          alignment: Alignment.center,
          children: [
            // Road
            Container(height: 100, width: double.infinity, color: Colors.grey.shade400),
            // Zebra Crossing
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(10, (i) => Container(width: 20, height: 100, color: Colors.white)),
            ),
            // The Car
            AnimatedPositioned(
              duration: const Duration(seconds: 2),
              left: _isCarStopped ? 50 : -200,
              child: const Icon(Icons.directions_car, size: 60, color: Colors.red),
            ),
          ],
        ),
        const SizedBox(height: 40),
        if (!_isCarStopped)
          ElevatedButton.icon(
            onPressed: () => setState(() => _isCarStopped = true),
            icon: const Icon(Icons.front_hand),
            label: const Text('Estender a Mão ✋'),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.orange, foregroundColor: Colors.white),
          )
        else if (!_crossedSuccessfully)
          ElevatedButton.icon(
            onPressed: () => setState(() => _crossedSuccessfully = true),
            icon: const Icon(Icons.directions_walk),
            label: const Text('Atravessar Agora!'),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.green, foregroundColor: Colors.white),
          )
        else
          const Text('Atravessou com segurança! 🎉', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold, fontSize: 18)),
      ],
    );
  }

  Widget _buildConclusion() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.verified, size: 80, color: Colors.green),
        const SizedBox(height: 24),
        const Text('Excelente, Lucas!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        const Text(
          'Lembre-se: A faixa é sua, mas a segurança depende de você ser visto.',
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 32),
        const Text('+40 XP', style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold, fontSize: 24)),
      ],
    );
  }

  Widget _buildAction() {
    return ElevatedButton(
      onPressed: () {
        if (_step == 1 && !_crossedSuccessfully) return;
        if (_step < 2) setState(() => _step++);
        else Navigator.of(context).pop();
      },
      style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
      child: Text(_step == 2 ? 'Concluir' : 'Continuar'),
    );
  }
}
