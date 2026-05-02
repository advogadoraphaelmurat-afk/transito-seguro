import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';

class AlcoholMissionScreen extends StatefulWidget {
  final dynamic mission;
  const AlcoholMissionScreen({super.key, this.mission});

  @override
  State<AlcoholMissionScreen> createState() => _AlcoholMissionScreenState();
}

class _AlcoholMissionScreenState extends State<AlcoholMissionScreen> {
  int _step = 0; // 0: Intro, 1: Normal Reaction, 2: "Drunk" Reaction, 3: Result
  Stopwatch _stopwatch = Stopwatch();
  int? _normalTime;
  int? _drunkTime;
  bool _canTap = false;
  Color _lightColor = Colors.red;

  void _startTest() {
    setState(() {
      _canTap = false;
      _lightColor = Colors.red;
    });
    
    final delay = 2 + (DateTime.now().millisecond % 3);
    Timer(Duration(seconds: delay), () {
      if (mounted) {
        setState(() {
          _lightColor = Colors.green;
          _canTap = true;
          _stopwatch.reset();
          _stopwatch.start();
        });
      }
    });
  }

  void _handleTap() {
    if (!_canTap) return;
    
    _stopwatch.stop();
    setState(() {
      if (_step == 1) {
        _normalTime = _stopwatch.elapsedMilliseconds;
        _step = 2;
      } else if (_step == 2) {
        _drunkTime = _stopwatch.elapsedMilliseconds;
        _step = 3;
      }
      _canTap = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Missão: Reflexos e Álcool')),
      body: Stack(
        children: [
          // Blur effect for "Drunk" step
          if (_step == 2)
            Positioned.fill(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
                child: Container(color: Colors.black.withOpacity(0.1)),
              ),
            ),
          
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (_step == 0) _buildIntro(),
                if (_step == 1 || _step == 2) _buildTest(),
                if (_step == 3) _buildResult(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIntro() {
    return Column(
      children: [
        const Icon(Icons.wine_bar, size: 80, color: Colors.red),
        const SizedBox(height: 24),
        const Text(
          'Como o Álcool afeta você?',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        const Text(
          'Muitas pessoas acham que "dirigem melhor" ou que "não afeta nada". Vamos testar seus reflexos agora (sóbrio) e depois simulando os efeitos do álcool no cérebro.',
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        ElevatedButton(
          onPressed: () {
            setState(() => _step = 1);
            _startTest();
          },
          child: const Text('Começar Teste Sóbrio'),
        ),
      ],
    );
  }

  Widget _buildTest() {
    // Drunk reaction delay simulation
    // We add an artificial delay to the tap detection in Drunk mode
    return Column(
      children: [
        Text(
          _step == 1 ? 'TESTE SÓBRIO' : 'SIMULAÇÃO: SOB EFEITO',
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
        ),
        const SizedBox(height: 20),
        const Text('Toque na tela o mais rápido possível quando a luz ficar VERDE!'),
        const SizedBox(height: 40),
        GestureDetector(
          onTap: () {
            if (_step == 2) {
              // Simulating delayed signal from brain to finger
              Timer(const Duration(milliseconds: 300), _handleTap);
            } else {
              _handleTap();
            }
          },
          child: Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: _lightColor,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(color: _lightColor.withOpacity(0.5), blurRadius: 20, spreadRadius: 10),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildResult() {
    final diff = _drunkTime! - _normalTime!;
    return Column(
      children: [
        const Icon(Icons.analytics, size: 80, color: Colors.blue),
        const SizedBox(height: 24),
        const Text('O Resultado é Assustador!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
        const SizedBox(height: 24),
        _buildStatRow('Tempo Sóbrio', '${_normalTime}ms'),
        _buildStatRow('Tempo "Alcoolizado"', '${_drunkTime}ms'),
        const Divider(),
        _buildStatRow('Atraso extra', '${diff}ms', color: Colors.red),
        const SizedBox(height: 24),
        Text(
          'A 80km/h, esses ${diff}ms extras significam que você percorreria ${(80 * diff / 3600).toStringAsFixed(1)} metros ANTES de começar a frear.',
          style: const TextStyle(fontStyle: FontStyle.italic),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        ElevatedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Entendi o Perigo'),
        ),
      ],
    );
  }

  Widget _buildStatRow(String label, String value, {Color? color}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Text(value, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: color)),
        ],
      ),
    );
  }
}
