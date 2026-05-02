import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'core/providers.dart';
import 'core/models.dart';
import 'features/auth/presentation/login_screen.dart';
import 'features/missions/presentation/mission_screen.dart';
import 'features/missions/presentation/rafael_mission_screen.dart';
import 'features/missions/presentation/crosswalk_mission_screen.dart';
import 'features/missions/presentation/physics_mission_screen.dart';
import 'features/missions/presentation/accessibility_mission_screen.dart';
import 'features/missions/presentation/alcohol_mission_screen.dart';
import 'features/missions/presentation/learning_path_screen.dart';
import 'features/profile/presentation/profile_screen.dart';
import 'features/store/presentation/store_screen.dart';

void main() {
  runApp(
    const ProviderScope(
      child: CidadeVivaApp(),
    ),
  );
}

class CidadeVivaApp extends StatelessWidget {
  const CidadeVivaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Trânsito Seguro: Cidade Viva',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2196F3),
          brightness: Brightness.dark,
          surface: const Color(0xFF1E293B),
        ),
        textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme),
        appBarTheme: AppBarTheme(
          backgroundColor: const Color(0xFF0F172A),
          elevation: 0,
          centerTitle: true,
          titleTextStyle: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        cardTheme: CardTheme(
          color: const Color(0xFF1E293B),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
            side: BorderSide(color: Colors.white.withOpacity(0.05)),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blueAccent,
            foregroundColor: Colors.white,
            minimumSize: const Size(double.infinity, 56),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            elevation: 0,
          ),
        ),
      ),
      home: const LoginScreen(),
    );

  }
}

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final volumesAsync = ref.watch(filteredVolumesProvider);
    final authState = ref.watch(authProvider);

    final isRafael = (authState.currentGrade ?? 0) >= 6;
    final characterName = isRafael ? 'Rafael' : 'Lucas';
    final characterColor = isRafael ? Colors.green : Colors.orange;

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Olá, ${authState.userName ?? "Estudante"}!',
              style: const TextStyle(fontSize: 14),
            ),
            Text(
              'Cidade Viva: $characterName',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: characterColor,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_bag_outlined),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const StoreScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const ProfileScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              ref.read(authProvider.notifier).logout();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: volumesAsync.when(
        data: (volumes) => ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _buildDailyChallengeCard(context, ref),
            const SizedBox(height: 24),
            const Text(
              'Trilha de Aprendizado',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            ...volumes.map((volume) {
              return Card(
              margin: const EdgeInsets.only(bottom: 16),
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: BorderSide(
                  color: volume.id == (authState.currentGrade! - 3)
                      ? characterColor
                      : Colors.transparent,
                  width: 2,
                ),
              ),
              child: ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                leading: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: characterColor.withOpacity(0.2),
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    'Vol ${volume.id}',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: characterColor,
                    ),
                  ),
                ),
                title: Text(
                  volume.title,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                subtitle: Text(volume.cycle.name.toUpperCase()),
                trailing: const Icon(Icons.play_circle_fill, size: 32),
                onTap: () {
                  if (volume.modules.isNotEmpty) {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => LearningPathScreen(volume: volume),
                      ),
                    );
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Conteúdo em desenvolvimento!')),
                    );
                  }
                },
              );
            }).toList(),
          ],
        ),

        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 60, color: Colors.red),
              const SizedBox(height: 16),
              Text('Erro: $err'),
              ElevatedButton(
                onPressed: () => ref.refresh(volumesProvider),
                child: const Text('Tentar Novamente'),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: characterColor,
        label: Text('Missão do $characterName'),
        icon: const Icon(Icons.map),
      ),
    );
  }

  Widget _buildDailyChallengeCard(BuildContext context, WidgetRef ref) {
    final challengeAsync = ref.watch(dailyChallengeProvider);

    return challengeAsync.when(
      data: (challenge) {
        if (challenge == null) return const SizedBox.shrink();
        return Container(
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Colors.deepPurple, Colors.indigo],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.deepPurple.withOpacity(0.3),
                blurRadius: 10,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(20),
              onTap: () => _showChallengeDialog(context, ref, challenge),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white24,
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: const Icon(Icons.star, color: Colors.amber, size: 30),
                    ),
                    const SizedBox(width: 20),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'DESAFIO DIÁRIO',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.2,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            challenge.title,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Icon(Icons.arrow_forward_ios, color: Colors.white54, size: 16),
                  ],
                ),
              ),
            ),
          ),
        );
      },
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (err, stack) => const SizedBox.shrink(),
    );
  }

  void _showChallengeDialog(BuildContext context, WidgetRef ref, DailyChallenge challenge) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.grey.shade900,
        title: Text(challenge.title, style: const TextStyle(color: Colors.white)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(challenge.description ?? '', style: const TextStyle(color: Colors.white70)),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.monetization_on, color: Colors.amber, size: 20),
                const SizedBox(width: 4),
                Text('+${challenge.rewardCoins}', style: const TextStyle(color: Colors.amber, fontWeight: FontWeight.bold)),
                const SizedBox(width: 20),
                const Icon(Icons.bolt, color: Colors.yellow, size: 20),
                const SizedBox(width: 4),
                Text('+${challenge.rewardXp}', style: const TextStyle(color: Colors.yellow, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Depois')),
          ElevatedButton(
            onPressed: () async {
              try {
                await ref.read(apiServiceProvider).completeChallenge(challenge.id);
                if (context.mounted) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Desafio concluído! Recompensas creditadas.')),
                  );
                  ref.invalidate(dailyChallengeProvider);
                  ref.invalidate(authProvider); // Refresh user stats
                }
              } catch (e) {
                if (context.mounted) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Erro: $e')),
                  );
                }
              }
            },
            child: const Text('Concluir'),
          ),
        ],
      ),
    );
  }
}

