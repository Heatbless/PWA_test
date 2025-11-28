import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class OfflineService {
  static SharedPreferences? _prefs;
  static const String _tasksKey = 'offline_tasks';

  static Future<void> initialize() async {
    _prefs = await SharedPreferences.getInstance();
  }

  static Future<List<Map<String, dynamic>>> getTasks() async {
    if (_prefs == null) await initialize();
    
    final tasksJson = _prefs!.getString(_tasksKey);
    if (tasksJson == null) return [];

    final List<dynamic> tasksList = jsonDecode(tasksJson);
    return tasksList.cast<Map<String, dynamic>>();
  }

  static Future<void> addTask(Map<String, dynamic> task) async {
    final tasks = await getTasks();
    tasks.add(task);
    await _saveTasks(tasks);
  }

  static Future<void> toggleTask(int taskId) async {
    final tasks = await getTasks();
    final taskIndex = tasks.indexWhere((task) => task['id'] == taskId);
    
    if (taskIndex != -1) {
      tasks[taskIndex]['completed'] = !tasks[taskIndex]['completed'];
      await _saveTasks(tasks);
    }
  }

  static Future<void> deleteTask(int taskId) async {
    final tasks = await getTasks();
    tasks.removeWhere((task) => task['id'] == taskId);
    await _saveTasks(tasks);
  }

  static Future<void> _saveTasks(List<Map<String, dynamic>> tasks) async {
    if (_prefs == null) await initialize();
    
    final tasksJson = jsonEncode(tasks);
    await _prefs!.setString(_tasksKey, tasksJson);
  }

  static Future<void> clearAllTasks() async {
    if (_prefs == null) await initialize();
    await _prefs!.remove(_tasksKey);
  }
}