import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/providers.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final isRafael = (authState.currentGrade ?? 0) >= 6;
    final characterColor = isRafael ? Colors.green : Colors.orange;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Meu Perfil'),
        backgroundColor: characterColor.withOpacity(0.1),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            CircleAvatar(
              radius: 60,
              backgroundColor: characterColor,
              child: Icon(
                isRafael ? Icons.face_retouching_natural : Icons.face,
                size: 60,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              authState.userName ?? 'Estudante',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            Text(
              '${authState.currentGrade}º Ano - Ciclo ${isRafael ? "Autoral" : "Infantil"}',
              style: const TextStyle(color: Colors.white70),
            ),
            const SizedBox(height: 32),
            _buildStatCard(
              context,
              'Experiência (XP)',
              '1,250',
              Icons.bolt,
              Colors.yellow.shade700,
            ),
            const SizedBox(height: 16),
            _buildStatCard(
              context,
              'Cidadania (Coins)',
              '300',
              Icons.monetization_on,
              Colors.amber,
            ),
            const SizedBox(height: 32),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Meu Inventário',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 16),
            _buildInventorySection(ref),
            const SizedBox(height: 32),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Minhas Conquistas',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildBadge(Icons.visibility, 'Olho de Lince', Colors.blue),
                _buildBadge(Icons.shield, 'Protetor', Colors.red),
                _buildBadge(Icons.menu_book, 'Sabe-Tudo', Colors.purple),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInventorySection(WidgetRef ref) {
    final inventoryAsync = ref.watch(userInventoryProvider);

    return inventoryAsync.when(
      data: (items) {
        if (items.isEmpty) {
          return const Text('Nenhum item adquirido ainda. Vá até a loja!', style: TextStyle(color: Colors.white54));
        }
        return SizedBox(
          height: 100,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: items.length,
            itemBuilder: (context, index) {
              final userItem = items[index];
              final item = userItem.item;
              return Container(
                margin: const EdgeInsets.only(right: 12),
                width: 80,
                decoration: BoxDecoration(
                  color: userItem.isEquipped ? Colors.blue.withOpacity(0.3) : Colors.white10,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: userItem.isEquipped ? Colors.blue : Colors.white24,
                  ),
                ),
                child: InkWell(
                  onTap: () async {
                    try {
                      await ref.read(apiServiceProvider).equipItem(userItem.itemId);
                      ref.invalidate(userInventoryProvider);
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Erro: $e')));
                    }
                  },
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        item?.category == 'AVATAR_HAT' ? Icons.face : (item?.category == 'AVATAR_VEHICLE' ? Icons.directions_bike : Icons.checkroom),
                        color: userItem.isEquipped ? Colors.blue : Colors.white54,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        item?.name.split(' ').first ?? 'Item',
                        style: TextStyle(fontSize: 10, color: userItem.isEquipped ? Colors.blue : Colors.white70),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        );
      },
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (err, stack) => Text('Erro: $err'),
    );
  }


  Widget _buildStatCard(BuildContext context, String title, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white10,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white05),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 40),
          const SizedBox(width: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(color: Colors.white70)),
              Text(
                value,
                style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBadge(IconData icon, String label, Color color) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: color.withOpacity(0.2),
            shape: BoxShape.circle,
            border: Border.all(color: color),
          ),
          child: Icon(icon, color: color, size: 30),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontSize: 10, color: Colors.white70)),
      ],
    );
  }
}
