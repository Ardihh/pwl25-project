<template>
  <div>
    <Navbar />

    <div class="container mx-auto px-8 py-8 max-w-4xl">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold">Project: {{ project.title }}</h2>
        <div class="flex gap-2">
          <button 
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            @click="toggleEditMode"
          >
            {{ isEditing ? 'Cancel' : 'Edit Project' }}
          </button>
          <button 
            class="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            @click="deleteProject"
          >
            Delete Project
          </button>
        </div>
      </div>

      <!-- Edit Project Form -->
      <div v-if="isEditing" class="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
        <h3 class="text-xl font-bold mb-4">Edit Project</h3>
        <form @submit.prevent="updateProject" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700">Title:</label>
            <input 
              v-model="editForm.title" 
              type="text"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700">Description:</label>
            <textarea 
              v-model="editForm.description" 
              rows="3"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700">Budget:</label>
            <input 
              v-model="editForm.budget" 
              type="number"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700">Deadline:</label>
            <input 
              v-model="editForm.deadline" 
              type="date"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700">Status:</label>
            <select 
              v-model="editForm.status"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="planning">Planning</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button 
              type="submit"
              class="px-5 py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
            <button 
              type="button"
              class="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              @click="toggleEditMode"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Project Details (View Mode) -->
      <div v-else class="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
        <p class="mb-3"><span class="font-bold">Description:</span> {{ project.description }}</p>
        <p class="mb-3"><span class="font-bold">Budget:</span> {{ project.budget }}</p>
        <p class="mb-3"><span class="font-bold">Deadline:</span> {{ project.deadline }}</p>
        <p class="mb-3"><span class="font-bold">Status:</span> 
          <span class="px-2 py-1 rounded text-sm font-semibold" 
                :class="{
                  'bg-green-100 text-green-800': project.status === 'completed',
                  'bg-blue-100 text-blue-800': project.status === 'ongoing',
                  'bg-yellow-100 text-yellow-800': project.status === 'planning',
                  'bg-red-100 text-red-800': project.status === 'on_hold'
                }">
            {{ project.status }}
          </span>
        </p>
      </div>

      <div class="mb-6">
        <button 
          class="px-4 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          @click="$router.push(`/projects/${id}/tasks/new`)"
        >
          + Add Task
        </button>
      </div>

      <h3 class="text-2xl font-bold mb-4">Tasks</h3>
      
      <div v-if="tasks.length === 0" class="bg-gray-50 p-5 rounded-lg text-center text-gray-600 border border-dashed border-gray-300">
        No tasks yet
      </div>

      <div v-else class="space-y-3">
        <!-- Edit Task Form -->
        <div 
          v-if="editingTaskId"
          class="bg-blue-50 p-5 rounded-xl shadow-sm border-2 border-blue-300"
        >
          <h4 class="text-xl font-bold mb-4">Edit Task</h4>
          <form @submit.prevent="updateTask" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Title:</label>
              <input 
                v-model="taskEditForm.title" 
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Detail:</label>
              <textarea 
                v-model="taskEditForm.detail" 
                rows="3"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700">Priority (1–5):</label>
                <input 
                  type="number" 
                  v-model="taskEditForm.priority" 
                  min="1" 
                  max="5" 
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700">Due Date:</label>
                <input 
                  type="date" 
                  v-model="taskEditForm.due_date" 
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">Status:</label>
              <select 
                v-model="taskEditForm.status"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div class="flex gap-2">
              <button 
                type="submit"
                class="px-5 py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>
              <button 
                type="button"
                class="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                @click="cancelEditTask"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Task List -->
        <div 
          v-for="task in tasks" 
          :key="task.id" 
          class="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
        >
          <h4 class="text-xl font-semibold mb-2">{{ task.title }}</h4>
          <p class="text-gray-600 mb-2">{{ task.detail }}</p>
          <div class="flex flex-wrap gap-4 text-sm">
            <p><span class="font-semibold">Status:</span> 
              <span class="px-2 py-1 rounded text-xs font-semibold"
                    :class="{
                      'bg-green-100 text-green-800': task.status === 'done',
                      'bg-blue-100 text-blue-800': task.status === 'in_progress',
                      'bg-yellow-100 text-yellow-800': task.status === 'todo'
                    }">
                {{ task.status }}
              </span>
            </p>
            <p><span class="font-semibold">Priority:</span> {{ task.priority }}</p>
            <p><span class="font-semibold">Due:</span> {{ task.due_date }}</p>
          </div>
          <div class="mt-4 flex gap-2">
            <button 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
              @click="startEditTask(task)"
            >
              Edit
            </button>
            <button 
              class="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
              @click="remove(task.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const id = route.params.id;

    const project = ref({});
    const tasks = ref([]);
    const isEditing = ref(false);
    const editingTaskId = ref(null);
    const editForm = ref({
      title: '',
      description: '',
      budget: 0,
      deadline: '',
      status: 'planning'
    });
    const taskEditForm = ref({
      title: '',
      detail: '',
      priority: 3,
      due_date: '',
      status: 'todo'
    });

    const loadProject = async () => {
      const res = await api.get(`/projects/${id}`);
      project.value = res.data.project;
      editForm.value = {
        title: project.value.title || '',
        description: project.value.description || '',
        budget: project.value.budget || 0,
        deadline: project.value.deadline || '',
        status: project.value.status || 'planning'
      };
    };

    const loadTasks = async () => {
      const res = await api.get(`/tasks/project/${id}`);
      tasks.value = res.data.tasks;
    };

    const toggleEditMode = () => {
      isEditing.value = !isEditing.value;
      if (isEditing.value) {
        editForm.value = {
          title: project.value.title || '',
          description: project.value.description || '',
          budget: project.value.budget || 0,
          deadline: project.value.deadline || '',
          status: project.value.status || 'planning'
        };
      }
    };

    const updateProject = async () => {
      try {
        const res = await api.put(`/projects/${id}`, editForm.value);
        project.value = res.data.project;
        isEditing.value = false;
        alert('Project updated successfully!');
      } catch (err) {
        alert('Failed to update project: ' + (err.response?.data?.message || err.message));
      }
    };

    const startEditTask = (task) => {
      editingTaskId.value = task.id;
      taskEditForm.value = {
        title: task.title || '',
        detail: task.detail || '',
        priority: task.priority || 3,
        due_date: task.due_date || '',
        status: task.status || 'todo'
      };
    };

    const cancelEditTask = () => {
      editingTaskId.value = null;
      taskEditForm.value = {
        title: '',
        detail: '',
        priority: 3,
        due_date: '',
        status: 'todo'
      };
    };

    const updateTask = async () => {
      try {
        await api.put(`/tasks/${editingTaskId.value}`, taskEditForm.value);
        await loadTasks();
        editingTaskId.value = null;
        alert('Task updated successfully!');
      } catch (err) {
        alert('Failed to update task: ' + (err.response?.data?.message || err.message));
      }
    };

    const remove = async (taskId) => {
      await api.delete(`/tasks/${taskId}`);
      loadTasks();
    };

    onMounted(() => {
      loadProject();
      loadTasks();
    });

    const deleteProject = async () => {
      if (!confirm("Yakin ingin hapus project ini?")) return;
      await api.delete(`/projects/${id}`);
      window.location.href = "/projects";
    };

    return { 
      project, 
      tasks, 
      id, 
      isEditing, 
      editingTaskId,
      editForm, 
      taskEditForm,
      toggleEditMode, 
      updateProject, 
      startEditTask,
      cancelEditTask,
      updateTask,
      remove, 
      deleteProject 
    };
  },
};
</script>