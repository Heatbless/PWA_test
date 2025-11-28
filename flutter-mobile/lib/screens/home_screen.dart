import 'package:flutter/material.dart';
import '../services/offline_service.dart';
import '../services/notification_service.dart';
import '../widgets/task_card.dart';
import '../widgets/offline_banner.dart';

class HomeScreen extends StatefulWidget {
  final bool isOnline;

  const HomeScreen({super.key, required this.isOnline});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Map<String, dynamic>> tasks = [];
  final TextEditingController _taskController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadTasks();
  }

  Future<void> _loadTasks() async {
    final loadedTasks = await OfflineService.getTasks();
    setState(() {
      tasks = loadedTasks;
    });
  }

  Future<void> _addTask() async {
    if (_taskController.text.isNotEmpty) {
      final newTask = {
        'id': DateTime.now().millisecondsSinceEpoch,
        'title': _taskController.text,
        'completed': false,
        'createdAt': DateTime.now().toIso8601String(),
      };

      await OfflineService.addTask(newTask);
      _taskController.clear();
      _loadTasks();

      // Show notification
      await NotificationService.showNotification(
        'Task Added',
        'New task: ${newTask['title']}',
      );
    }
  }

  Future<void> _toggleTask(int taskId) async {
    await OfflineService.toggleTask(taskId);
    _loadTasks();
  }

  Future<void> _deleteTask(int taskId) async {
    await OfflineService.deleteTask(taskId);
    _loadTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter PWA Tasks'),
        backgroundColor: Colors.blue[600],
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(widget.isOnline ? Icons.cloud_done : Icons.cloud_off),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(widget.isOnline ? 'Online' : 'Offline'),
                  backgroundColor: widget.isOnline ? Colors.green : Colors.orange,
                ),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          if (!widget.isOnline) const OfflineBanner(),
          Container(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _taskController,
                    decoration: InputDecoration(
                      hintText: 'Add a new task...',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 12,
                      ),
                    ),
                    onSubmitted: (_) => _addTask(),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: _addTask,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue[600],
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 12,
                    ),
                  ),
                  child: const Icon(Icons.add),
                ),
              ],
            ),
          ),
          Expanded(
            child: tasks.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.task_alt,
                          size: 64,
                          color: Colors.grey[400],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'No tasks yet',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.grey[600],
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Add a task to get started!',
                          style: TextStyle(
                            color: Colors.grey[500],
                          ),
                        ),
                      ],
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: tasks.length,
                    itemBuilder: (context, index) {
                      final task = tasks[index];
                      return TaskCard(
                        task: task,
                        onToggle: () => _toggleTask(task['id']),
                        onDelete: () => _deleteTask(task['id']),
                      );
                    },
                  ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await NotificationService.showNotification(
            'PWA Demo',
            'This app works offline! 🚀',
          );
        },
        backgroundColor: Colors.blue[600],
        child: const Icon(Icons.notifications),
      ),
    );
  }

  @override
  void dispose() {
    _taskController.dispose();
    super.dispose();
  }
}