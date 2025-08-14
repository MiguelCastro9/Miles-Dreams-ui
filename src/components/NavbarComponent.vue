<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { IonHeader, IonToolbar } from "@ionic/vue";
import { UserCircle } from "@vicons/tabler";

const router = useRouter();
const profileImage = ref<string | null>(null);

onMounted(() => {
  const storedProfileImage = localStorage.getItem("profile-image");
  if (storedProfileImage) {
    profileImage.value = storedProfileImage;
  }
});
</script>

<template>
  <ion-header>
    <ion-toolbar class="navbar">
      <img
        src="https://tr2storage.blob.core.windows.net/agencylogos/UmTh6gJoyuBQeE4MeT-LqtpXW7T613IlFq.png"
        alt="Miles Dreams"
        class="navbar-brand"
      />
      <div slot="end" class="navbar-actions">
        <span class="points-text">12 Pontos</span>
        <div class="profile-image-content" @click="router.push('/tabs/settings')">
          <img
            v-if="profileImage"
            :src="profileImage"
            alt="Perfil"
            class="profile-image"
          />
          <UserCircle v-else class="user-icon" />
        </div>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>
.navbar {
  display: flex;
  --background: #fff;
}

.navbar-brand {
  height: 40px;
  width: 160px;
  object-fit: contain;
  margin: 8px 0;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.points-text {
  font-weight: 600;
  font-size: 14px;
  margin-top: 12px;
  color: #3d72ed;
}

.profile-image-content {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-icon {
  width: 32px;
  height: 32px;
  color: #3d72ed;
}

@media (prefers-color-scheme: dark) {
  .navbar {
    --background: #181818;
  }
}
</style>
