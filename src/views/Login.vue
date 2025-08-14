<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router/index.ts";
import { useRoute } from "vue-router";
import { AuthService } from "@/services/auth/AuthService";
import { Login } from "@/types/auth/Login";
import { clearObject } from "@/utils-functions/clearObject";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
import ModalRecoverPasswordComponent from "@/components/auth/ModalRecoverPasswordComponent.vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonToast,
  IonIcon,
  IonSpinner
} from "@ionic/vue";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

const route = useRoute();
const authService = new AuthService();
const loadingLogin = ref(false);
const showRegister = ref(false);
const showModalRecoverPassword = ref(false);
const showPassword = ref(false);
const message = ref();
const showToast = ref(false);

const paramLogin = ref<Login>({
  username: "",
  password: ""
});

const authLogin = async () => {
  try {
    loadingLogin.value = true;
    const data = await authService.loginService(paramLogin.value);
    localStorage.setItem("token", data.token);
    clearObject(paramLogin.value);
    router.push({ path: "/tabs/offers" });
  } catch (error: any) {
    if (error.response?.status === 401) {
      message.value = "Usuário ou senha inválidos.";
      showToast.value = true;
    } else {
      message.value = "Ocorreu um erro no login, por favor entre em contato conosco.";
      showToast.value = true;
    }
  } finally {
    loadingLogin.value = false;
  }
};

function togglePassword() {
  showPassword.value = !showPassword.value;
}

onMounted(() => {
  if (route.query.sessionExpired === "401") {
    message.value = "Sua sessão expirou, por favor faça login novamente.";
    showToast.value = true;
  }
});
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" class="container">
      <div class="card-container">
        <div class="brand-container">
          <img
            src="https://tr2storage.blob.core.windows.net/agencylogos/UmTh6gJoyuBQeE4MeT-LqtpXW7T613IlFq.png"
            alt="Miles Dreams"
            class="brand"
          />
        </div>
        <div v-if="!showRegister">
          <h1 class="card-title">Bem-vindo</h1>
          <p class="card-subtitle">"Faça login para continuar</p>
          <div class="card-form">
            <ion-item class="custom-input" lines="none">
              <ion-input
                type="text"
                placeholder="* Usuário"
                :maxlength="100"
                v-model="paramLogin.username"
                class="input-field"
              />
            </ion-item>

            <ion-item class="custom-input" lines="none">
              <ion-input
                :type="showPassword ? 'text' : 'password'"
                placeholder="* Senha"
                :maxlength="100"
                v-model="paramLogin.password"
                class="input-field"
              >
                <div slot="end" class="icon-password" @click="togglePassword">
                  <ion-icon :icon="showPassword ? eyeOutline : eyeOffOutline" ></ion-icon>
                </div>
              </ion-input>
            </ion-item>

            <ion-button
              expand="block"
              shape="round"
              class="card-button"
              @click="authLogin()"
              :disabled="loadingLogin"
            >
              <template v-if="loadingLogin">
                <ion-spinner name="crescent"></ion-spinner>
              </template>
              <template v-else> Entrar </template>
            </ion-button>

            <div class="card-footer">
              <p class="card-link"><span @click="showModalRecoverPassword = true">Esqueceu sua senha ?</span></p>
              <p>Ainda não tem uma conta ?<span class="card-link" @click="showRegister = true">Registre-se</span></p>
            </div>
          </div>
        </div>
        <div v-else>
          <RegisterComponent />
          <div class="card-footer">
            <p>Já tem uma conta ?<span class="card-link" @click="showRegister = false"> Entrar </span></p>
          </div>
        </div>
        <ModalRecoverPasswordComponent v-model:showModalRecoverPassword="showModalRecoverPassword" />
      </div>

      <ion-toast
        :is-open="showToast"
        :message="message"
        :duration="4000"
        color="primary"
        position="bottom"
        class="custom-toast"
        @didDismiss="showToast = false"
      />
    </ion-content>
  </ion-page>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-container {
  background-color: var(--ion-color-light);
  border-radius: 25px;
  padding: 30px;
  margin: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.brand-container {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.brand {
  width: 280px;
  height: auto;
  object-fit: contain;
}

.card-title {
  color: var(--ion-color-dark);
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
}

.card-subtitle {
  color: var(--ion-color-medium);
  font-size: 14px;
  text-align: center;
  margin-bottom: 32px;
}

.card-form {
  margin-bottom: 24px;
  width: 100%;
}

.custom-input {
  --background: var(--ion-color-light-shade);
  --border-radius: 12px;
  --padding-start: 12px;
  --padding-end: 12px;
  --min-height: 55px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
}

.input-field {
  --placeholder-color: var(--ion-color-medium);
  --placeholder-opacity: 1;
  font-size: 16px;
  color: var(--ion-color-dark);
}

.icon-password {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  font-size: 20px;
  color: #3d72ed;
}

.card-button {
  --border-radius: 12px;
  --box-shadow: none;
  --padding-top: 15px;
  --padding-bottom: 15px;
  font-weight: 600;
  margin-top: 18px;
  letter-spacing: 0.5px;
  height: 45px;
}

.card-footer {
  text-align: center;
  margin-top: 24px;
  color: var(--ion-color-medium);
  font-size: 14px;
}

.card-link {
  color: var(--ion-color-primary);
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}
</style>
