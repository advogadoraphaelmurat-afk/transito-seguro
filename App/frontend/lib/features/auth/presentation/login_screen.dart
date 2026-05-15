import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/providers.dart';
import '../../../main.dart';
import '../../dashboard/presentation/teacher_dashboard_screen.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String? _selectedCharacter; // Track which character is selected

  void _handleLogin() async {
    final notifier = ref.read(authProvider.notifier);
    await notifier.login(_emailController.text, _passwordController.text);
    
    if (mounted) {
      final state = ref.read(authProvider);
      if (state.error != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(state.error!)),
        );
      } else if (state.token != null) {
        if (state.role == 'TEACHER') {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => const TeacherDashboardScreen()),
          );
        } else {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => const HomeScreen()),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.blue.shade900,
              Colors.black,
            ],
          ),
        ),
        child: SingleChildScrollView(
          child: SizedBox(
            height: MediaQuery.of(context).size.height - 48,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.traffic_rounded, size: 80, color: Colors.blue),
                const SizedBox(height: 24),
                Text(
                  'Escolha seu Personagem',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildCharacterOption(
                      context,
                      'Lucas',
                      '4º e 5º Ano',
                      Colors.orange,
                      Icons.face,
                    ),
                    _buildCharacterOption(
                      context,
                      'Rafael',
                      '6º Ano +',
                      Colors.green,
                      Icons.face_retouching_natural,
                    ),
                  ],
                ),
                const SizedBox(height: 40),
                TextField(
                  controller: _emailController,
                  style: const TextStyle(color: Colors.white),
                  decoration: const InputDecoration(
                    labelText: 'E-mail',
                    labelStyle: TextStyle(color: Colors.white70),
                    filled: true,
                    fillColor: Colors.white10,
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  style: const TextStyle(color: Colors.white),
                  decoration: const InputDecoration(
                    labelText: 'Senha',
                    labelStyle: TextStyle(color: Colors.white70),
                    filled: true,
                    fillColor: Colors.white10,
                  ),
                ),
                const SizedBox(height: 32),
                if (authState.isLoading)
                  const CircularProgressIndicator()
                else
                  ElevatedButton(
                    onPressed: _handleLogin,
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(double.infinity, 50),
                    ),
                    child: const Text('Entrar na Cidade'),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCharacterOption(
    BuildContext context,
    String name,
    String years,
    Color color,
    IconData icon,
  ) {
    final isSelected = _selectedCharacter == name;

    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedCharacter = name;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeInOut,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: isSelected ? color.withOpacity(0.2) : Colors.transparent,
          border: Border.all(
            color: isSelected ? color : Colors.transparent,
            width: 2.5,
          ),
        ),
        child: Column(
          children: [
            AnimatedScale(
              scale: isSelected ? 1.15 : 1.0,
              duration: const Duration(milliseconds: 250),
              child: CircleAvatar(
                radius: 40,
                backgroundColor: color,
                child: Icon(icon, size: 40, color: Colors.white),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              name,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: isSelected ? color : Colors.white,
                fontSize: isSelected ? 18 : 16,
              ),
            ),
            Text(years, style: const TextStyle(fontSize: 12, color: Colors.white70)),
            if (isSelected)
              Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Icon(Icons.check_circle, color: color, size: 22),
              ),
          ],
        ),
      ),
    );
  }
}
