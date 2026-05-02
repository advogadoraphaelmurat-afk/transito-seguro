import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/models.dart';

class RafaelInvestigationScreen extends ConsumerStatefulWidget {
  final Mission mission;

  const RafaelInvestigationScreen({super.key, required this.mission});

  @override
  ConsumerState<RafaelInvestigationScreen> createState() => _RafaelInvestigationScreenState();
}

class _RafaelInvestigationScreenState extends ConsumerState<RafaelInvestigationScreen> {
  int _step = 0;
  double _dataDiscovery = 0.0;
  bool _revealed = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text('Investigação de Rafael'),
        backgroundColor: Colors.green.shade900,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            LinearProgressIndicator(
              value: (_step + 1) / 4,
              backgroundColor: Colors.white10,
              color: Colors.green,
            ),
            const SizedBox(height: 24),
            Expanded(child: _buildStepContent()),
            _buildNavigation(),
          ],
        ),
      ),
    );
  }

  Widget _buildStepContent() {
    switch (_step) {
      case 0:
        return _buildIntro();
      case 1:
        return _buildChartDiscovery();
      case 2:
        return _buildDebate();
      case 3:
        return _buildConclusion();
      default:
        return Container();
    }
  }

  Widget _buildIntro() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.analytics, size: 100, color: Colors.green),
        const SizedBox(height: 24),
        Text(
          'A Epidemia Silenciosa',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        const Text(
          'Rafael notou que as estatísticas de trânsito mudaram muito. Vamos ajudá-lo a analisar os dados reais do Rio de Janeiro?',
          style: TextStyle(color: Colors.white70, fontSize: 16),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildChartDiscovery() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Arraste para revelar o aumento dos sinistros de moto no Rio:',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        Container(
          height: 250,
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.white10,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Stack(
            children: [
              // The "Hidden" Chart
              Padding(
                padding: const EdgeInsets.all(20),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildBar(0.1, '1990', Colors.grey),
                    _buildBar(0.2, '2000', Colors.grey),
                    _buildBar(0.5, '2010', Colors.orange),
                    _buildBar(0.9, '2024', Colors.red),
                  ],
                ),
              ),
              // The Veil
              if (!_revealed)
                GestureDetector(
                  onHorizontalDragUpdate: (details) {
                    setState(() {
                      _dataDiscovery += details.delta.dx / 300;
                      if (_dataDiscovery > 0.8) _revealed = true;
                    });
                  },
                  child: Container(
                    width: double.infinity,
                    height: double.infinity,
                    color: Colors.black.withOpacity(1.0 - _dataDiscovery.clamp(0.0, 1.0)),
                    child: Center(
                      child: Icon(Icons.swipe, color: Colors.green.withOpacity(0.5), size: 50),
                    ),
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        if (_revealed)
          const Text(
            'De 3% para mais de 40% das mortes no trânsito! 🚨',
            style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold),
          ),
      ],
    );
  }

  Widget _buildBar(double height, String label, Color color) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Container(
          width: 40,
          height: height * 180,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(color: Colors.white54, fontSize: 10)),
      ],
    );
  }

  Widget _buildDebate() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Rafael pergunta: Qual a maior causa desse aumento?',
          style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 32),
        _buildOption('Falta de habilidade natural.'),
        _buildOption('Pressa dos apps de entrega e abuso das leis.', correct: true),
        _buildOption('As motos ficaram mais rápidas sozinhos.'),
      ],
    );
  }

  Widget _buildOption(String text, {bool correct = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: OutlinedButton(
        onPressed: () {
          if (correct) {
            setState(() => _step = 3);
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Pense no sistema de entregas...')),
            );
          }
        },
        style: OutlinedButton.styleFrom(
          minimumSize: const Size(double.infinity, 60),
          side: const BorderSide(color: Colors.green),
        ),
        child: Text(text, style: const TextStyle(color: Colors.white)),
      ),
    );
  }

  Widget _buildConclusion() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.verified_user, size: 80, color: Colors.green),
        const SizedBox(height: 24),
        const Text(
          'Visão Sistêmica!',
          style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        const Text(
          'Você e Rafael agora entendem que a segurança no trânsito depende de leis justas e empresas responsáveis.',
          style: TextStyle(color: Colors.white70),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 32),
        const Text('+100 XP', style: TextStyle(color: Colors.greenAccent, fontWeight: FontWeight.bold, fontSize: 24)),
      ],
    );
  }

  Widget _buildNavigation() {
    return ElevatedButton(
      onPressed: () {
        if (_step < 3) {
          if (_step == 1 && !_revealed) return;
          setState(() => _step++);
        } else {
          Navigator.of(context).pop();
        }
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.green,
        minimumSize: const Size(double.infinity, 50),
      ),
      child: Text(_step == 3 ? 'Finalizar Investigação' : 'Continuar'),
    );
  }
}
