import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/models.dart';

class MissionScreen extends ConsumerStatefulWidget {
  final Mission mission;

  const MissionScreen({super.key, required this.mission});

  @override
  ConsumerState<MissionScreen> createState() => _MissionScreenState();
}

class _MissionScreenState extends ConsumerState<MissionScreen> {
  double _mirrorOffset = 0.0;
  bool _motoFound = false;
  int _step = 0; // 0: Intro, 1: Interaction, 2: Quiz, 3: Feedback

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.mission.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            Expanded(
              child: _buildContent(),
            ),
            const SizedBox(height: 20),
            _buildActionButtons(),
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
        return _buildInteraction();
      case 2:
        return _buildQuiz();
      case 3:
        return _buildFeedback();
      default:
        return Container();
    }
  }

  Widget _buildIntro() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.auto_stories, size: 80, color: Colors.blue),
        const SizedBox(height: 24),
        Text(
          'O Mistério das Motos Invisíveis',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        const Text(
          'Lucas está no carro do tio e percebeu que algumas motos parecem "sumir" de repente. Isso se chama Ponto Cego!',
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildInteraction() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Arraste o espelho para encontrar a moto escondida!',
          style: TextStyle(fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        Stack(
          alignment: Alignment.center,
          children: [
            // Representing the Mirror view
            ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: Container(
                width: 300,
                height: 200,
                color: Colors.grey.shade800,
                child: Stack(
                  children: [
                    AnimatedPositioned(
                      duration: const Duration(milliseconds: 100),
                      left: -50 + (_mirrorOffset * 100),
                      top: 0,
                      child: Image.asset(
                        'assets/images/mission_1_1_blindspot.png',
                        width: 400,
                        height: 200,
                        fit: FontWeight.bold == null ? null : BoxFit.cover,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // The Frame
            Container(
              width: 310,
              height: 210,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey, width: 5),
                borderRadius: BorderRadius.circular(25),
              ),
            ),
          ],
        ),
        const SizedBox(height: 40),
        Slider(
          value: _mirrorOffset,
          min: -1.0,
          max: 1.0,
          onChanged: (val) {
            setState(() {
              _mirrorOffset = val;
              if (val > 0.6) {
                _motoFound = true;
              }
            });
          },
        ),
        if (_motoFound)
          const Text(
            'VOCÊ ENCONTROU! 🎉',
            style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold, fontSize: 20),
          ),
      ],
    );
  }

  Widget _buildQuiz() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'A moto estava no ponto cego porque...',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 32),
        _buildQuizOption('O motorista não quis ver.'),
        _buildQuizOption('A moto é pequena e estava em um ângulo difícil.', correct: true),
        _buildQuizOption('As motos têm luzes que as tornam invisíveis.'),
      ],
    );
  }

  Widget _buildQuizOption(String text, {bool correct = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: ElevatedButton(
        onPressed: () {
          if (correct) {
            setState(() => _step = 3);
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Tente de novo! Pense no tamanho da moto.')),
            );
          }
        },
        style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
        child: Text(text),
      ),
    );
  }

  Widget _buildFeedback() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.verified, size: 80, color: Colors.green),
        const SizedBox(height: 24),
        const Text(
          'Parabéns, Guardião!',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        const Text(
          'Você aprendeu que motos somem no ponto cego. Nunca se esqueça: No trânsito, ser visto é ser salvo!',
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 32),
        const Text('+50 XP', style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold, fontSize: 24)),
      ],
    );
  }

  Widget _buildActionButtons() {
    return ElevatedButton(
      onPressed: () {
        if (_step < 3) {
          if (_step == 1 && !_motoFound) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Encontre a moto primeiro!')),
            );
            return;
          }
          setState(() => _step++);
        } else {
          Navigator.of(context).pop();
        }
      },
      style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 60)),
      child: Text(_step == 0 ? 'Começar Missão' : _step == 3 ? 'Concluir' : 'Próximo'),
    );
  }
}
