import 'package:dio/dio.dart';
import 'models.dart';

class ApiService {
  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: 'http://10.0.2.2:3000', // Default IP for Android Emulator to access localhost
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
    ),
  );

  Future<List<Volume>> getVolumes() async {
    try {
      final response = await _dio.get('/missions/volumes');
      return (response.data as List).map((v) => Volume.fromJson(v)).toList();
    } catch (e) {
      throw Exception('Falha ao carregar volumes: $e');
    }
  }

  Future<Volume> getVolumeDetails(int id) async {
    try {
      final response = await _dio.get('/missions/volumes/$id');
      return Volume.fromJson(response.data);
    } catch (e) {
      throw Exception('Falha ao carregar detalhes do volume: $e');
    }
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _dio.post('/auth/login', data: {
        'email': email,
        'password': password,
      });
      return response.data;
    } catch (e) {
      throw Exception('Falha ao autenticar: $e');
    }
  }

  Future<void> completeMission(String userId, String missionId, double score) async {
    try {
      await _dio.post('/missions/complete', data: {
        'userId': userId,
        'missionId': missionId,
        'score': score,
      });
    } catch (e) {
      throw Exception('Falha ao registrar progresso: $e');
    }
  }
  Future<List<ClassInfo>> getTeacherClasses() async {
    try {
      final response = await _dio.get('/teacher/classes');
      return (response.data as List).map((c) => ClassInfo.fromJson(c)).toList();
    } catch (e) {
      throw Exception('Falha ao carregar turmas: $e');
    }
  }

  Future<ClassInfo> getClassProgress(String classId) async {
    try {
      final response = await _dio.get('/teacher/class/$classId/progress');
      return ClassInfo.fromJson(response.data);
    } catch (e) {
      throw Exception('Falha ao carregar progresso da turma: $e');
    }
  }

  Future<List<StoreItem>> getStoreItems() async {
    try {
      final response = await _dio.get('/store/items');
      return (response.data as List).map((i) => StoreItem.fromJson(i)).toList();
    } catch (e) {
      throw Exception('Falha ao carregar loja: $e');
    }
  }

  Future<void> purchaseItem(String itemId) async {
    try {
      await _dio.post('/store/purchase', data: {'itemId': itemId});
    } catch (e) {
      throw Exception('Falha na compra: $e');
    }
  }

  Future<List<InventoryItem>> getInventory() async {
    try {
      final response = await _dio.get('/store/inventory');
      return (response.data as List).map((i) => InventoryItem.fromJson(i)).toList();
    } catch (e) {
      throw Exception('Falha ao carregar inventário: $e');
    }
  }

  Future<void> equipItem(String itemId) async {
    try {
      await _dio.post('/store/equip', data: {'itemId': itemId});
    } catch (e) {
      throw Exception('Falha ao equipar item: $e');
    }
  }

  Future<DailyChallenge?> getDailyChallenge() async {
    try {
      final response = await _dio.get('/challenges/daily');
      if (response.data == null) return null;
      return DailyChallenge.fromJson(response.data);
    } catch (e) {
      throw Exception('Falha ao carregar desafio diário: $e');
    }
  }

  Future<void> completeChallenge(String challengeId) async {
    try {
      await _dio.post('/challenges/complete', data: {'challengeId': challengeId});
    } catch (e) {
      throw Exception('Falha ao concluir desafio: $e');
    }
  }
}

