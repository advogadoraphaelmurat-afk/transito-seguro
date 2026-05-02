import 'package:flutter/material.dart';

class PhysicsMissionScreen extends StatefulWidget {
  final dynamic mission;
  const PhysicsMissionScreen({super.key, this.mission});

  @override
  State<PhysicsMissionScreen> createState() => _PhysicsMissionScreenState();
}

class _PhysicsMissionScreenState extends State<PhysicsMissionScreen> {
  double _speed = 40.0; // km/h
  bool _isRaining = false;
  int _step = 0; // 0: Config, 1: Animation, 2: Result

  double get _brakingDistance {
    // Basic Physics: d = v^2 / (2 * mu * g)
    // Simplified for app:
    final v = _speed / 3.6; // m/s
    final mu = _isRaining ? 0.4 : 0.7; // friction coefficient
    return (v * v) / (2 * mu * 9.8);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Missão: A Física da Frenagem')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            if (_step == 0) _buildConfig(),
            if (_step == 1) _buildSimulation(),
            if (_step == 2) _buildResult(),
          ],
        ),
      ),
    );
  }

  Widget _buildConfig() {
    return Column(
      children: [
        const Icon(Icons.speed, size: 80, color: Colors.blue),
        const SizedBox(height: 24),
        const Text(
          'Você controla a velocidade',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        const Text(
          'Muitos acham que parar o carro é instantâneo. Vamos ver o que a física diz. Escolha a velocidade e as condições da pista.',
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        Text('Velocidade: ${_speed.round()} km/h', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        Slider(
          value: _speed,
          min: 20,
          max: 120,
          onChanged: (val) => setState(() => _speed = val),
        ),
        SwitchListTile(
          title: const Text('Pista Molhada (Chuva)'),
          value: _isRaining,
          onChanged: (val) => setState(() => _isRaining = val),
        ),
        const SizedBox(height: 40),
        ElevatedButton(
          onPressed: () => setState(() => _step = 1),
          child: const Text('Simular Frenagem de Emergência'),
        ),
      ],
    );
  }

  Widget _buildSimulation() {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('FREANDO...', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24, color: Colors.red)),
          const SizedBox(height: 40),
          // Simple car animation could go here
          const CircularProgressIndicator(),
          const SizedBox(height: 40),
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: _brakingDistance),
            duration: const Duration(seconds: 2),
            builder: (context, value, child) {
              return Text(
                '${value.toStringAsFixed(1)} metros',
                style: const TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
              );
            },
            onEnd: () => setState(() => _step = 2),
          ),
        ],
      ),
    );
  }

  Widget _buildResult() {
    return Column(
      children: [
        const Icon(Icons.warning_amber_rounded, size: 80, color: Colors.orange),
        const SizedBox(height: 24),
        Text(
          'Resultado: ${_brakingDistance.toStringAsFixed(1)}m',
          style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Text(
          'A ${_speed.round()} km/h, seu carro percorreu ${_brakingDistance.toStringAsFixed(1)} metros APÓS você pisar no freio.',
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        if (_speed > 60)
          const Text(
            'Lembre-se: Dobrar a velocidade QUADRUPLICA a distância de frenagem!',
            style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
        const SizedBox(height: 40),
        ElevatedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Entendi a Física'),
        ),
      ],
    );
  }
}
