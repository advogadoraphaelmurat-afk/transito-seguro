import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'api_service.dart';
import 'models.dart';

// --- AUTH ---

class AuthState {
  final String? token;
  final String? userName;
  final int? currentGrade;
  final String? role;
  final bool isLoading;
  final String? error;

  AuthState({
    this.token,
    this.userName,
    this.currentGrade,
    this.role,
    this.isLoading = false,
    this.error,
  });

  AuthState copyWith({
    String? token,
    String? userName,
    int? currentGrade,
    String? role,
    bool? isLoading,
    String? error,
  }) {
    return AuthState(
      token: token ?? this.token,
      userName: userName ?? this.userName,
      currentGrade: currentGrade ?? this.currentGrade,
      role: role ?? this.role,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final ApiService _apiService;

  AuthNotifier(this._apiService) : super(AuthState()) {
    _loadSession();
  }

  Future<void> _loadSession() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    final name = prefs.getString('userName');
    final grade = prefs.getInt('currentGrade');
    final role = prefs.getString('role');

    if (token != null) {
      state = state.copyWith(token: token, userName: name, currentGrade: grade, role: role);
    }
  }

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final result = await _apiService.login(email, password);
      final token = result['access_token'];
      final user = result['user'];

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);
      await prefs.setString('userName', user['name']);
      await prefs.setInt('currentGrade', user['currentGrade'] ?? 0);
      await prefs.setString('role', user['role']);

      state = state.copyWith(
        token: token,
        userName: user['name'],
        currentGrade: user['currentGrade'],
        role: user['role'],
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    state = AuthState();
  }
}

final apiServiceProvider = Provider((ref) => ApiService());

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return AuthNotifier(apiService);
});

// --- DATA ---

final volumesProvider = FutureProvider<List<Volume>>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  return apiService.getVolumes();
});

final filteredVolumesProvider = Provider<AsyncValue<List<Volume>>>((ref) {
  final volumesAsync = ref.watch(volumesProvider);
  final authState = ref.watch(authProvider);

  return volumesAsync.whenData((volumes) {
    if (authState.currentGrade == null) return volumes;

    // Mapping Grade to Volume
    // 4th Year (grade 4) -> Vol 1
    // 5th Year (grade 5) -> Vol 2
    // 6th Year (grade 6) -> Vol 3 (Rafael starts here)
    return volumes.where((v) => v.id <= (authState.currentGrade! - 3)).toList();
  });
});

final volumeDetailsProvider = FutureProvider.family<Volume, int>((ref, id) async {
  final apiService = ref.watch(apiServiceProvider);
  return apiService.getVolumeDetails(id);
});

// --- TEACHER ---

final teacherClassesProvider = FutureProvider<List<ClassInfo>>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  return apiService.getTeacherClasses();
});

final classProgressProvider = FutureProvider.family<ClassInfo, String>((ref, classId) async {
  final apiService = ref.watch(apiServiceProvider);
  return apiService.getClassProgress(classId);
});

// --- STORE & GAMIFICATION ---

final storeItemsProvider = FutureProvider<List<StoreItem>>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  return apiService.getStoreItems();
});

final userInventoryProvider = FutureProvider<List<InventoryItem>>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  return apiService.getInventory();
});

final dailyChallengeProvider = FutureProvider<DailyChallenge?>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  return apiService.getDailyChallenge();
});



