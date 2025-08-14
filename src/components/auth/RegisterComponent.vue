<script setup lang="ts">
import { ref, computed, watch } from "vue";
import router from "@/router/index.ts";
import { AuthService } from "@/services/auth/AuthService";
import { User } from "@/types/auth/User";
import { clearObject } from "@/utils-functions/clearObject";
import {
  IonButton,
  IonItem,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonSpinner
} from "@ionic/vue";
import { searchSharp, eyeOutline, eyeOffOutline } from "ionicons/icons";

const authService = new AuthService();
const dataRpaUser = ref<User | undefined>(undefined);
const loadingRegister = ref(false);
const loadingRpaUser = ref(false);
const stepRegister = ref(1);
const confirmPassword = ref("");
const showPassword = ref(false);
const message = ref();
const showToast = ref(false);
 
const param = ref<User>({
  name: "",
  lastname: "",
  gender: "",
  username: "",
  email: "",
  password: "",
  firtQuestion: "",
  firtQuestionAnswer: "",
  secoundQuestion: "",
  secoundQuestionAnswer: "",
  trirdQuestion: "",
  trirdQuestionAnswer: ""
});

const loadRpaUser = async () => {
  try {
    loadingRpaUser.value = true;
    const data = await authService.loadRpaUserService(param.value.email);
    dataRpaUser.value = data;
    if (dataRpaUser.value) {
      param.value.name = dataRpaUser.value.name;
      param.value.lastname = dataRpaUser.value.lastname;
      param.value.gender = dataRpaUser.value.gender;
      message.value = "Usuário encontrado, dados preenchidos.";
      showToast.value = true;
    } else {
      message.value = "Nenhum usuário encontrado.";
      showToast.value = true;
    }
  } catch (error: any) {
    if (error.response?.status !== 401) {
      message.value = "Ocorreu um erro buscar usuário, por favor entre em contato conosco.";
      showToast.value = true;
    }
  } finally {
    loadingRpaUser.value = false;
  }
};

const authRegister = async () => {
  try {
    loadingRegister.value = true;
    const data = await authService.registerService(param.value);
    localStorage.setItem("token", data.token);
    clearObject(param.value);
    confirmPassword.value = "";
    dataRpaUser.value = undefined;
    stepRegister.value = 1;
    message.value = "Cadastro realizado com sucesso!";
    showToast.value = true;
    router.push({ path: "/tabs/home" });
  } catch (error: any) {
    if (error.response?.status !== 401) {
      message.value = "Ocorreu um erro no registro, por favor entre em contato conosco.";
      showToast.value = true;
    }
  } finally {
    loadingRegister.value = false;
  }
};

const isStepOneRegisterValid = computed(() => {
  return (
    param.value.email &&
    param.value.username &&
    param.value.name &&
    param.value.lastname &&
    param.value.gender
  );
});

const passwordRules = computed(() => {
  const pwd = param.value.password || "";
  const email = param.value.email || "";

  return [
    { text: "Mínimo de 8 caracteres", valid: pwd.length >= 8 },
    { text: "Pelo menos 1 letra maiúscula", valid: /[A-Z]/.test(pwd) },
    { text: "Pelo menos 1 letra minúscula", valid: /[a-z]/.test(pwd) },
    { text: "Pelo menos 1 número", valid: /\d/.test(pwd) },
    { text: "Não pode ser igual ao e-mail", valid: pwd !== email },
    { text: "Senha e confirmação iguais", valid: pwd === confirmPassword.value && pwd.length > 0 }
  ];
});

const isStepTwoRegisterValid = computed(() =>
  passwordRules.value.every(rule => rule.valid)
);

const isStepThreeRegisterValid = computed(() => {
  return (
    param.value.firtQuestion &&
    param.value.firtQuestionAnswer &&
    param.value.secoundQuestion &&
    param.value.secoundQuestionAnswer &&
    param.value.trirdQuestionAnswer &&
    param.value.trirdQuestionAnswer
  );
});

function togglePassword() {
  showPassword.value = !showPassword.value;
}

watch(() => param.value.email, (newEmail) => {
    const atIndex = newEmail.indexOf("@");
    if (atIndex !== -1) {
      param.value.username = newEmail.substring(0, atIndex);
    } else {
      param.value.username = "";
    }
  }
);
</script>

<template>
  <!-- ##################### STEP 1 ##################### -->
  <h1 class="card-title">Crie sua conta</h1>
  <p class="card-subtitle">Comece sua jornada conosco, primeiro informe seu e-mail para sabermos se você é nosso cliente e então siga os próximos passos</p>
  <div class="card-form" v-if="stepRegister === 1">
    <ion-item class="custom-input" lines="none">
      <ion-input
        type="text"
        placeholder="* E-mail"
        :maxlength="100"
        v-model="param.email"
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

    <div class="spinner-container">
      <ion-spinner v-if="loadingRpaUser" color="secondary"></ion-spinner>
    </div>

    <div v-if="dataRpaUser">
      <ion-item class="custom-input" lines="none">
        <ion-input
          :disabled="true"
          type="text"
          placeholder="* Usuário"
          :maxlength="100"
          v-model="param.username"
          class="input-field"
        />
      </ion-item>

      <ion-item class="custom-input" lines="none">
        <ion-input
          type="text"
          placeholder="* Nome"
          :maxlength="100"
          v-model="param.name"
          class="input-field"
        />
      </ion-item>

      <ion-item class="custom-input" lines="none">
        <ion-input
          type="text"
          placeholder="* Sobrenome"
          :maxlength="100"
          v-model="param.lastname"
          class="input-field"
        />
      </ion-item>

      <ion-item class="custom-input custom-select" lines="none">
        <ion-select
          interface="action-sheet"
          placeholder="* Gênero"
          :maxlength="100"
          v-model="param.gender"
          class="select-field"
        >
          <ion-select-option value="masculino">Masculino</ion-select-option>
          <ion-select-option value="feminino">Feminino</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-button
        expand="block"
        shape="round"
        class="card-button"
        @click="stepRegister = 2"
        :disabled="!isStepOneRegisterValid"
      >
        Próximo
      </ion-button>
    </div>
  </div>

  <!-- ##################### STEP 2 ##################### -->
  <div class="card-form" v-if="stepRegister === 2">
  <ion-item class="custom-input" lines="none">
    <ion-input
      :type="showPassword ? 'text' : 'password'"
      placeholder="* Senha"
      :maxlength="100"
      v-model="param.password"
      class="input-field"
    />
  </ion-item>

  <ion-item class="custom-input" lines="none">
    <ion-input
      :type="showPassword ? 'text' : 'password'"
      placeholder="* Confirme a senha"
      :maxlength="100"
      v-model="confirmPassword"
      class="input-field"
    >
      <div slot="end" class="icon-password" @click="togglePassword">
        <ion-icon :icon="showPassword ? eyeOutline : eyeOffOutline" ></ion-icon>
      </div>
    </ion-input>
  </ion-item>

    <ul class="password-rules-list">
      <li v-for="rule in passwordRules" :key="rule.text" :class="{ valid: rule.valid, invalid: !rule.valid }">
        {{ rule.text }}
      </li>
    </ul>

    <ion-button
      expand="block"
      shape="round"
      class="card-button"
      @click="stepRegister = 3"
      :disabled="!isStepTwoRegisterValid"
    >
      Próximo
    </ion-button>

    <ion-button
      expand="block"
      shape="round"
      fill="outline"
      color="medium"
      class="card-button"
      @click="stepRegister = 1"
    >
      Voltar
    </ion-button>
  </div>

  <!-- ##################### STEP 3 ##################### -->
  <div class="card-form" v-if="stepRegister === 3">
    <p class="label-text">Escolha a primeira pergunta de segurança:</p>
    <ion-item class="custom-input custom-select" lines="none">
      <ion-select
        interface="action-sheet"
        placeholder="* Escolha"
        :maxlength="100"
        v-model="param.firtQuestion"
        class="select-field"
      >
        <ion-select-option value="Qual foi o destino da sua primeira viagem ?">Qual foi o destino da sua primeira viagem ?</ion-select-option>
        <ion-select-option value="Qual foi a sua última viagem de férias ?">Qual foi a sua última viagem de férias ?</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item class="custom-input" lines="none">
      <ion-input
        type="text"
        placeholder="* Resposta"
        :maxlength="100"
        v-model="param.firtQuestionAnswer"
        class="input-field"
      >
      </ion-input>
    </ion-item>

    <p class="label-text">Escolha a segunda pergunta de segurança:</p>
    <ion-item class="custom-input custom-select" lines="none">
      <ion-select
        interface="action-sheet"
        placeholder="* Escolha"
        :maxlength="100"
        v-model="param.secoundQuestion"
        class="select-field"
      >
        <ion-select-option value="Qual foi a sua viagem favorita ?">Qual foi a sua viagem favorita ?</ion-select-option>
        <ion-select-option value="Qual destino de viagem dos sonhos ?">Qual destino de viagem dos sonhos ?</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item class="custom-input" lines="none">
      <ion-input
        type="text"
        placeholder="* Resposta"
        :maxlength="100"
        v-model="param.secoundQuestionAnswer"
        class="input-field"
      >
      </ion-input>
    </ion-item>

    <p class="label-text">Escolha a terceira pergunta de segurança:</p>
    <ion-item class="custom-input custom-select" lines="none">
      <ion-select
        interface="action-sheet"
        placeholder="* Escolha"
        :maxlength="100"
        v-model="param.trirdQuestion"
        class="select-field"
      >
        <ion-select-option value="Qual objeto você não deixaria de levar em uma viagem ?">Qual objeto você não deixaria de levar em uma viagem ?</ion-select-option>
        <ion-select-option value="O que você mais gostaria de fazer em uma viagem ?">O que você mais gostaria de fazer em uma viagem ?</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item class="custom-input" lines="none">
      <ion-input
        type="text"
        placeholder="* Resposta"
        :maxlength="100"
        v-model="param.trirdQuestionAnswer"
        class="input-field"
      >
      </ion-input>
    </ion-item>

    <ion-button
      expand="block"
      shape="round"
      class="card-button"
      @click="authRegister()"
      :disabled="!isStepThreeRegisterValid"
    >
      <template v-if="loadingRegister">
        <ion-spinner name="crescent"></ion-spinner>
      </template>
      <template v-else> Registrar </template>
    </ion-button>

    <ion-button
      expand="block"
      shape="round"
      fill="outline"
      color="medium"
      class="card-button"
      @click="stepRegister = 2"
    >
      Voltar
    </ion-button>
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
</template>

<style scoped>
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

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-password {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  font-size: 20px;
  color: #4d8dff;
}

.password-rules-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 10px;
}

.password-rules-list li {
  font-size: 0.9rem;
  margin: 2px 0;
}

.password-rules-list li.valid {
  color: #2A947D;
}

.password-rules-list li.invalid {
  color:#D03A52;
}

.label-text {
  font-size: 14px;
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
  margin-top: 18px;
  letter-spacing: 0.5px;
  height: 45px;
}
</style>
