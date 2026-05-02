import 'dart:convert';

enum Cycle { interdisciplinar, autoral, ensinoMedio }

enum MissionType { quiz, simulation, interactive, task }

class Volume {
  final int id;
  final String title;
  final Cycle cycle;
  final List<Module> modules;

  Volume({
    required this.id,
    required this.title,
    required this.cycle,
    this.modules = const [],
  });

  factory Volume.fromJson(Map<String, dynamic> json) {
    return Volume(
      id: json['id'],
      title: json['title'],
      cycle: Cycle.values.firstWhere((e) => e.name.toUpperCase() == json['cycle']),
      modules: (json['modules'] as List?)
              ?.map((m) => Module.fromJson(m))
              .toList() ??
          [],
    );
  }
}

class Module {
  final String id;
  final int bimonthly;
  final String title;
  final List<Mission> missions;

  Module({
    required this.id,
    required this.bimonthly,
    required this.title,
    this.missions = const [],
  });

  factory Module.fromJson(Map<String, dynamic> json) {
    return Module(
      id: json['id'],
      bimonthly: json['bimonthly'],
      title: json['title'],
      missions: (json['missions'] as List?)
              ?.map((m) => Mission.fromJson(m))
              .toList() ??
          [],
    );
  }
}

class Mission {
  final String id;
  final String title;
  final String? description;
  final MissionType type;
  final int order;
  final int xpReward;
  final int coinsReward;
  final Map<String, dynamic> contentData;

  Mission({
    required this.id,
    required this.title,
    this.description,
    required this.type,
    required this.order,
    required this.xpReward,
    required this.coinsReward,
    required this.contentData,
  });

  factory Mission.fromJson(Map<String, dynamic> json) {
    Map<String, dynamic> data = {};
    if (json['contentData'] is String && (json['contentData'] as String).isNotEmpty) {
      try {
        data = jsonDecode(json['contentData']);
      } catch (_) {
        data = {};
      }
    } else {
      data = json['contentData'] ?? {};
    }

    return Mission(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      type: MissionType.values.firstWhere(
        (e) => e.name.toUpperCase() == json['type'],
        orElse: () => MissionType.task,
      ),
      order: json['order'] ?? 1,
      xpReward: json['xpReward'] ?? 0,
      coinsReward: json['coinsReward'] ?? 0,
      contentData: data,
    );
  }
}
class User {
  final String id;
  final String name;
  final String email;
  final String role;
  final int? currentGrade;
  final List<StudentProgress>? progress;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.currentGrade,
    this.progress,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      role: json['role'],
      currentGrade: json['currentGrade'],
      progress: (json['progress'] as List?)
          ?.map((p) => StudentProgress.fromJson(p))
          .toList(),
    );
  }
}

class ClassInfo {
  final String id;
  final String name;
  final List<User> students;

  ClassInfo({
    required this.id,
    required this.name,
    required this.students,
  });

  factory ClassInfo.fromJson(Map<String, dynamic> json) {
    return ClassInfo(
      id: json['id'],
      name: json['name'],
      students: (json['students'] as List?)
              ?.map((s) => User.fromJson(s))
              .toList() ??
          [],
    );
  }
}

class StudentProgress {
  final String id;
  final String missionId;
  final bool completed;
  final double? score;
  final DateTime? completedAt;
  final Mission? mission;

  StudentProgress({
    required this.id,
    required this.missionId,
    required this.completed,
    this.score,
    this.completedAt,
    this.mission,
  });

  factory StudentProgress.fromJson(Map<String, dynamic> json) {
    return StudentProgress(
      id: json['id'],
      missionId: json['missionId'],
      completed: json['completed'] ?? false,
      score: (json['score'] as num?)?.toDouble(),
      completedAt: json['completedAt'] != null 
          ? DateTime.parse(json['completedAt']) 
          : null,
      mission: json['mission'] != null ? Mission.fromJson(json['mission']) : null,
    );
  }
}

class StoreItem {
  final String id;
  final String name;
  final String? description;
  final int price;
  final String category;
  final String imageUrl;

  StoreItem({
    required this.id,
    required this.name,
    this.description,
    required this.price,
    required this.category,
    required this.imageUrl,
  });

  factory StoreItem.fromJson(Map<String, dynamic> json) {
    return StoreItem(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: json['price'],
      category: json['category'],
      imageUrl: json['imageUrl'],
    );
  }
}

class InventoryItem {
  final String userId;
  final String itemId;
  final bool isEquipped;
  final StoreItem? item;

  InventoryItem({
    required this.userId,
    required this.itemId,
    required this.isEquipped,
    this.item,
  });

  factory InventoryItem.fromJson(Map<String, dynamic> json) {
    return InventoryItem(
      userId: json['userId'],
      itemId: json['itemId'],
      isEquipped: json['isEquipped'] ?? false,
      item: json['item'] != null ? StoreItem.fromJson(json['item']) : null,
    );
  }
}

class DailyChallenge {
  final String id;
  final String title;
  final String? description;
  final String type;
  final String? content;
  final int rewardXp;
  final int rewardCoins;

  DailyChallenge({
    required this.id,
    required this.title,
    this.description,
    required this.type,
    this.content,
    required this.rewardXp,
    required this.rewardCoins,
  });

  factory DailyChallenge.fromJson(Map<String, dynamic> json) {
    return DailyChallenge(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      type: json['type'],
      content: json['content'],
      rewardXp: json['rewardXp'] ?? 0,
      rewardCoins: json['rewardCoins'] ?? 0,
    );
  }
}


