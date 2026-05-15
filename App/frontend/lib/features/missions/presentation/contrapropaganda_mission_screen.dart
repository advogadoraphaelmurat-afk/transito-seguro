import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/models.dart';

class ContrapropagandaMissionScreen extends ConsumerStatefulWidget {
  final Mission mission;

  const ContrapropagandaMissionScreen({super.key, required this.mission});

  @override
  ConsumerState<ContrapropagandaMissionScreen> createState() => _ContrapropagandaMissionScreenState();
}

class _ContrapropagandaMissionScreenState extends ConsumerState<ContrapropagandaMissionScreen> {
  int _step = 0;
  String _headline = "";
  bool _videoUploaded = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('A Contrapropaganda')),
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
    if (_step == 1) return _buildCreation();
    return _buildConclusion();
  }

  Widget _buildIntro() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.campaign, size: 80, color: Colors.redAccent),
        const SizedBox(height: 24),
        const Text('Vendendo Ilusões', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        const Text(
          'Comerciais de carro vendem ruas vazias e alta velocidade. A vida real entrega engarrafamentos e mortes. Chegou a hora de descontruir essa mensagem!',
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 32),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.red.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.redAccent),
          ),
          child: const Column(
            children: [
              Text('MISSÃO', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.redAccent)),
              SizedBox(height: 8),
              Text('Crie o título da sua contrapropaganda e anexe o vídeo/cartaz digital que você produziu com seu grupo na escola.', textAlign: TextAlign.center),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCreation() {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('1. Título de Impacto', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          const SizedBox(height: 16),
          TextField(
            decoration: const InputDecoration(
              hintText: 'Ex: A velocidade mata. Não compre essa ideia.',
              border: OutlineInputBorder(),
            ),
            onChanged: (val) => setState(() => _headline = val),
          ),
          const SizedBox(height: 40),
          const Text('2. Anexar Mídia (Vídeo ou Cartaz)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          const SizedBox(height: 16),
          GestureDetector(
            onTap: () {
              // Simulate file upload
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Fazendo upload da mídia...')));
              Future.delayed(const Duration(seconds: 1), () {
                if (mounted) setState(() => _videoUploaded = true);
              });
            },
            child: Container(
              height: 150,
              width: double.infinity,
              decoration: BoxDecoration(
                color: _videoUploaded ? Colors.green.withOpacity(0.1) : Colors.grey.shade200,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: _videoUploaded ? Colors.green : Colors.grey),
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(_videoUploaded ? Icons.check_circle : Icons.upload_file, size: 40, color: _videoUploaded ? Colors.green : Colors.grey),
                    const SizedBox(height: 8),
                    Text(_videoUploaded ? 'Mídia Anexada com Sucesso!' : 'Toque para enviar do celular', style: TextStyle(color: _videoUploaded ? Colors.green : Colors.grey.shade700)),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildConclusion() {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.publish, size: 80, color: Colors.purple),
        SizedBox(height: 24),
        Text('Contrapropaganda Publicada!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        SizedBox(height: 16),
        Text(
          'Seu projeto foi enviado para o Mural da Escola. Mostre para o mundo a realidade que os comerciais tentam esconder.',
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 32),
        Text('+100 XP  |  +50 Coins', style: TextStyle(color: Colors.orange, fontWeight: FontWeight.bold, fontSize: 24)),
      ],
    );
  }

  Widget _buildAction() {
    return ElevatedButton(
      onPressed: () {
        if (_step == 1 && (_headline.isEmpty || !_videoUploaded)) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Preencha o título e anexe a mídia.')));
          return;
        }
        
        if (_step < 2) {
          setState(() => _step++);
        } else {
          Navigator.of(context).pop();
        }
      },
      style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
      child: Text(_step == 2 ? 'Voltar para Missões' : 'Continuar'),
    );
  }
}
