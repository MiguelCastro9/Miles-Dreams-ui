<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { AuthService } from "@/services/auth/AuthService";
import router from "@/router/index.ts";
import { useRoute } from "vue-router";
import { Login } from "@/types/auth/Login";
import { User } from "@/types/auth/User";
import { clearObject } from "@/utils-functions/clearObject";
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonInputPasswordToggle,
  IonToast,
  IonSpinner,
  IonModal,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonTitle
} from "@ionic/vue";
import { searchSharp } from "ionicons/icons";

const route = useRoute();
const authService = new AuthService();
const dataRpaUser = ref<User>();
const loadingLogin = ref(false);
const loadingRpaUser = ref(false);
const loadingRegister = ref(false);
const isLogin = ref(true);
const messageWarning = ref();
const showToast = ref(false);
const buttonRegister = ref(true);
const showInfoForgotPasswordModal = ref(false);
const confirmPassword = ref("");
const paramLogin = ref<Login>({
  username: "",
  password: "",
});
const paramUser = ref<User>({
  name: "",
  lastname: "",
  gender: "",
  username: "",
  email: "",
  password: "",
});

const authLogin = async () => {
  try {
    loadingLogin.value = true;
    const data = await authService.loginService(paramLogin.value);
    localStorage.setItem("token", data.token);
    loadingLogin.value = false;
    router.push({ path: "/tabs/home" });
  } catch (error: any) {
    if (error.response?.status === 401) {
      messageWarning.value = "Usuário ou senha inválidos.";
      showToast.value = true;
      clearObject(paramLogin.value);
    } else {
      messageWarning.value =
        "Ocorreu um erro no login, por favor contate o administrador do sistema.";
      showToast.value = true;
      clearObject(paramLogin.value);
    }
  } finally {
    loadingLogin.value = false;
    clearObject(paramLogin.value);
  }
};

const loadRpaUser = async () => {
  try {
    loadingRpaUser.value = true;
    const data = await authService.loadRpaUserService(paramUser.value.email);
    dataRpaUser.value = data;
    console.log(dataRpaUser.value);
    if (dataRpaUser.value) {
      paramUser.value.name = dataRpaUser.value.name;
      paramUser.value.lastname = dataRpaUser.value.lastname;
      paramUser.value.gender = dataRpaUser.value.gender;
      messageWarning.value = "Usuário encontrado, dados preenchidos.";
      showToast.value = true;
      buttonRegister.value = false;
    } else {
      messageWarning.value = "Nenhum usuário encontrado.";
      showToast.value = true;
    }
  } catch (error: any) {
    if (error.response?.status !== 401) {
      messageWarning.value =
        "Ocorreu um erro buscar usuário, por favor contate o administrador do sistema.";
      showToast.value = true;
    }
  } finally {
    loadingRpaUser.value = false;
  }
};

const authRegister = async () => {
  try {
    loadingRegister.value = true;
    if (paramUser.value.password === confirmPassword.value) {
      const data = await authService.registerService(paramUser.value);
      localStorage.setItem("token", data.token);
      loadingRegister.value = false;
      buttonRegister.value = true;
      clearObject(paramUser.value);
      messageWarning.value = "Cadastro realizado com sucesso!";
      showToast.value = true;
      router.push({ path: "/tabs/home" });
    } else {
      messageWarning.value = "As senhas não conhecidem.";
      showToast.value = true;
    }
  } catch (error: any) {
    if (error.response?.status !== 401) {
      messageWarning.value =
        "Ocorreu um erro no registro, por favor contate o administrador do sistema.";
      showToast.value = true;
    }
  } finally {
    loadingRegister.value = false;
  }
};

watch(
  () => paramUser.value.email,
  (newEmail) => {
    const atIndex = newEmail.indexOf("@");
    if (atIndex !== -1) {
      paramUser.value.username = newEmail.substring(0, atIndex);
    } else {
      paramUser.value.username = "";
    }
  }
);

const handleLoginAndRegister = () => {
  isLogin.value = !isLogin.value;
};

onMounted(() => {
  if (route.query.sessionExpired === "401") {
    messageWarning.value = "Sua sessão expirou, por favor faça login novamente.";
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

        <h1 class="card-title">{{ isLogin ? "Bem-vindo" : "Crie sua conta" }}</h1>
        <p class="card-subtitle">
          {{
            isLogin
              ? "Faça login para continuar"
              : "Comece sua jornada conosco, primeiro informe seu e-mail para sabermos se você é nosso cliente"
          }}
        </p>

        <!-- LOGIN -->
        <div class="card-form" v-if="isLogin">
          <ion-item class="custom-input" lines="none">
            <ion-input
              type="text"
              placeholder="Usuário"
              v-model="paramLogin.username"
              class="input-field"
            />
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-input
              type="password"
              placeholder="Senha"
              v-model="paramLogin.password"
              class="input-field"
            >
              <ion-input-password-toggle slot="end" />
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
          <a href="#" @click.prevent="showInfoForgotPasswordModal = true" class="card-link">
                Esqueceu sua senha ?
              </a>
            <p>
              Ainda não tem uma conta ?
              <a href="#" @click.prevent="handleLoginAndRegister" class="card-link">
                Regitre-se
              </a>
            </p>
          </div>
        </div>

        <!-- REGISTRO -->
        <div class="card-form" v-if="!isLogin">
          <ion-item class="custom-input" lines="none">
            <ion-input
              type="text"
              placeholder="E-mail"
              v-model="paramUser.email"
              class="input-field"
            >
              <ion-icon
                slot="end"
                class="input-email-icon"
                :icon="searchSharp"
                aria-hidden="true"
                @click="loadRpaUser()"
              ></ion-icon>
            </ion-input>
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-input
              :disabled="true"
              type="text"
              placeholder="Usuário"
              v-model="paramUser.username"
              class="input-field"
            />
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-input
              type="text"
              placeholder="Nome"
              v-model="paramUser.name"
              class="input-field"
            />
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-input
              type="text"
              placeholder="Sobrenome"
              v-model="paramUser.lastname"
              class="input-field"
            />
          </ion-item>

          <ion-item class="custom-input custom-select" lines="none">
            <ion-select
              interface="action-sheet"
              placeholder="Gênero"
              v-model="paramUser.gender"
              class="select-field"
            >
              <ion-select-option value="masculino">Masculino</ion-select-option>
              <ion-select-option value="feminino">Feminino</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-input
              type="password"
              placeholder="Senha"
              v-model="paramUser.password"
              class="input-field"
            >
              <ion-input-password-toggle slot="end" />
            </ion-input>
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-input
              type="password"
              placeholder="Confime a senha"
              v-model="confirmPassword"
              class="input-field"
            >
              <ion-input-password-toggle slot="end" />
            </ion-input>
          </ion-item>

          <ion-button
            expand="block"
            shape="round"
            class="card-button"
            @click="authRegister()"
            :disabled="buttonRegister"
          >
            <template v-if="loadingRegister">
              <ion-spinner name="crescent"></ion-spinner>
            </template>
            <template v-else> Registrar </template>
          </ion-button>

          <div class="card-footer">
            <p>
              Já tem uma conta ?
              <a href="#" @click.prevent="handleLoginAndRegister" class="card-link">
                Entrar
              </a>
            </p>
          </div>
        </div>

        <!-- MODAL FORGOT YOUR PASSWORD -->
        <ion-modal :is-open="showInfoForgotPasswordModal">
          <ion-header>
            <ion-toolbar>
              <ion-title>Recuperar senha</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="showInfoForgotPasswordModal = false">Fechar</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <div style="text-align:center; margin-top: 32px;">
              <h2 style="margin-top: 16px;">Informe questões pessoais</h2>
              <p>Qual o nome do seu cão ?</p>
            </div>
          </ion-content>
        </ion-modal>
      </div>

      <ion-toast
        :is-open="showToast"
        :message="messageWarning"
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

.input-email-icon {
  color: #4d8dff;
  font-size: 20px;
}
.select-field {
  width: 100%;
  --placeholder-color: var(--ion-color-medium);
  --placeholder-opacity: 1;
  font-size: 16px;
  color: var(--ion-color-dark);
}

.card-button {
  --border-radius: 12px;
  --box-shadow: none;
  --padding-top: 15px;
  --padding-bottom: 15px;
  font-weight: 600;
  margin-top: 8px;
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
