<template>
  <div>
    <AdminNavbar />

    <div class="container mx-auto px-8 py-8 max-w-4xl text-gray-800">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold">Project: {{ project.title }}</h2>
        <div class="flex gap-2">
          <button 
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
            @click="toggleEditMode"
          >
            {{ isEditing ? 'Cancel' : 'Edit Project' }}
          </button>
          <button 
            class="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
            @click="deleteProject"
          >
            Delete Project
          </button>
        </div>
      </div>

      <div v-if="isEditing" class="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
        <h3 class="text-xl font-bold mb-4">Edit Project Details</h3>
        <form @submit.prevent="updateProject" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Title:</label>
            <input v-model="editForm.title" type="text" required class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Description:</label>
            <textarea v-model="editForm.description" rows="3" class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-2">Budget:</label>
              <input v-model="editForm.budget" type="number" class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Deadline:</label>
              <input v-model="editForm.deadline" type="date" class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Status:</label>
            <select v-model="editForm.status" class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="planning">Planning</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
          <div class="flex gap-2 pt-2">
            <button type="submit" class="px-5 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Save Changes</button>
            <button type="button" @click="toggleEditMode" class="px-5 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      </div>

      <div v-else class="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
        <p class="mb-3 text-gray-600"><span class="font-bold text-gray-800">Owner:</span> {{ project.owner_name }}</p>
        <p class="mb-3"><span class="font-bold">Description:</span> {{ project.description || 'No description' }}</p>
        <p class="mb-3"><span class="font-bold">Budget:</span> Rp {{ Number(project.budget).toLocaleString() }}</p>
        <p class="mb-3"><span class="font-bold">Deadline:</span> {{ project.deadline || 'No deadline' }}</p>
        <p class="mb-3"><span class="font-bold">Status:</span> 
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" 
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

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold">Tasks</h3>
        <button 
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md"
          @click="$router.push(`/projects/${id}/tasks/new`)"
        >
          + Add Task
        </button>
      </div>
      
      <div v-if="tasks.length === 0" class="bg-gray-50 p-10 rounded-xl text-center text-gray-500 border-2 border-dashed border-gray-200">
        No tasks assigned to this project.
      </div>

      <div v-else class="space-y-4">
        <div v-for="task in tasks" :key="task.id" class="bg-white p-5 rounded-xl shadow border border-gray-100">
          <div v-if="editingTaskId === task.id">
            <form @submit.prevent="updateTask" class="space-y-3">
              <input v-model="taskEditForm.title" class="w-full px-3 py-2 border rounded" placeholder="Task Title" />
              <textarea v-model="taskEditForm.detail" class="w-full px-3 py-2 border rounded" placeholder="Task Detail"></textarea>
              <div class="flex gap-2">
                <button type="submit" class="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                <button type="button" @click="editingTaskId = null" class="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              </div>
            </form>
          </div>
          <div v-else>
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-lg font-bold">{{ task.title }}</h4>
                <p class="text-gray-600 text-sm mb-2">{{ task.detail }}</p>
              </div>
              <div class="flex gap-2">
                <button @click="startEditTask(task)" class="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
                <button @click="deleteTask(task.id)" class="text-red-600 hover:underline text-sm font-semibold">Delete</button>
              </div>
            </div>
            <div class="flex gap-4 text-xs font-bold text-gray-500 uppercase">
              <span>Status: {{ task.status }}</span>
              <span>Priority: {{ task.priority }}</span>
              <span>Due: {{ task.due_date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../api/axios"; //
import AdminNavbar from "../../components/AdminNavbar.vue"; //

export default {
  components: { AdminNavbar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const project = ref({});
    const tasks = ref([]);
    const isEditing = ref(false);
    const editingTaskId = ref(null);

    const editForm = ref({ title: '', description: '', budget: 0, deadline: '', status: 'planning' });
    const taskEditForm = ref({ title: '', detail: '', priority: 3, due_date: '', status: 'todo' });

    const loadData = async () => {
      try {
        const projRes = await api.get(`/projects/${id}`); //
        project.value = projRes.data.project; //
        
        const taskRes = await api.get(`/tasks/project/${id}`); //
        tasks.value = taskRes.data.tasks; //
      } catch (err) {
        console.error("Error loading project data:", err);
      }
    };

    const toggleEditMode = () => {
      isEditing.value = !isEditing.value;
      if (isEditing.value) {
        // Sinkronkan form dengan data project saat ini
        const formattedDate = project.value.deadline ? new Date(project.value.deadline).toISOString().split('T')[0] : '';
        editForm.value = { ...project.value, deadline: formattedDate };
      }
    };

    const updateProject = async () => {
      try {
        const res = await api.put(`/projects/${id}`, editForm.value); //
        project.value = res.data.project; //
        isEditing.value = false;
        alert("Project updated!");
      } catch (err) {
        alert("Failed to update project.");
      }
    };

    const deleteProject = async () => {
      if (!confirm("Delete this project?")) return;
      await api.delete(`/projects/${id}`); //
      router.push("/admin/projects");
    };

    const startEditTask = (task) => {
      editingTaskId.value = task.id;
      taskEditForm.value = { ...task };
    };

    const updateTask = async () => {
      try {
        await api.put(`/tasks/${editingTaskId.value}`, taskEditForm.value); //
        await loadData();
        editingTaskId.value = null;
      } catch (err) {
        alert("Failed to update task.");
      }
    };

    const deleteTask = async (taskId) => {
      if (!confirm("Delete this task?")) return;
      await api.delete(`/tasks/${taskId}`); //
      loadData();
    };

    onMounted(loadData);

    return {
      id, project, tasks, isEditing, editForm, editingTaskId, taskEditForm,
      toggleEditMode, updateProject, deleteProject, startEditTask, updateTask, deleteTask
    };
  }
};
</script>