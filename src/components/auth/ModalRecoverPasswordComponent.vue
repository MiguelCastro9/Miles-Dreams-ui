<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import { AuthService } from "@/services/auth/AuthService";
import { User } from "@/types/auth/User";
import { RecoverPassword } from "@/types/auth/RecoverPassword";
import { clearObject } from "@/utils-functions/clearObject";
import {
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
  IonTitle,
  IonInputOtp,
} from "@ionic/vue";
import { searchSharp } from "ionicons/icons";

const props = defineProps({
  showModalRecoverPassword: Boolean
});

const emit = defineEmits(['update:showModalRecoverPassword']);
const authService = new AuthService();
const dataUser = ref<User | undefined>(undefined);
const loadingUser = ref(false);
const loadingRecoverPassword = ref(false);
const stepRecoverPassword = ref(1);
const checkFirtQuestion = ref("");
const checkFirtQuestionAnswer = ref("");
const checkSecoundQuestion = ref("");
const checkSecoundQuestionAnswer = ref("");
const checkTrirdQuestion = ref("");
const checkTrirdQuestionAnswer = ref("");
const confirmPassword = ref("");
const message = ref();
const showToast = ref(false);

const param = ref<RecoverPassword>({
  email: "",
  firtQuestionAnswer: "",
  secoundQuestionAnswer: "",
  trirdQuestionAnswer: "",
  password: ""
});

const loadUser = async () => {
  try {
    loadingUser.value = true;
    const data = await authService.loadUserService(param.value.email);
    dataUser.value = data;
    if (dataUser.value) {
      checkFirtQuestion.value = dataUser.value.firtQuestion;
      checkFirtQuestionAnswer.value = dataUser.value.firtQuestionAnswer;
      checkSecoundQuestion.value = dataUser.value.secoundQuestion;
      checkSecoundQuestionAnswer.value = dataUser.value.secoundQuestionAnswer;
      checkTrirdQuestion.value = dataUser.value.trirdQuestion;
      checkTrirdQuestionAnswer.value = dataUser.value.trirdQuestionAnswer;
      message.value = "Usuário encontrado.";
      showToast.value = true;
    }
  } catch (error: any) {
    if (error.response?.status === 404) {
      message.value = "Nenhum usuário encontrado.";
      showToast.value = true;
    }
    if (error.response?.status !== 401 && error.response?.status !== 404) {
      message.value =
        "Ocorreu um erro buscar usuário, por favor entre em contato conosco.";
      showToast.value = true;
    }
  } finally {
    loadingUser.value = false;
  }
};

const sendMailToRecoverPassword = async () => {
  try {
    let correctAnswers = 0;
    if (param.value.firtQuestionAnswer === dataUser.value?.firtQuestionAnswer) {
      correctAnswers++;
    }
    if (param.value.secoundQuestionAnswer === dataUser.value?.secoundQuestionAnswer) {
      correctAnswers++;
    }
    if (param.value.trirdQuestionAnswer === dataUser.value?.trirdQuestionAnswer) {
      correctAnswers++;
    }
    if (correctAnswers >= 2) {
      stepRecoverPassword.value = 2;
    } else {
      message.value = "Você precisa acertar pelo menos 2 respostas para prosseguirmos";
      showToast.value = true;
    }
  } catch (error: any) {
    if (error.response?.status !== 401) {
      message.value = "Ocorreu um erro ao enviar e-mail de recuperação de senha, por favor entre em contato conosco.";
      showToast.value = true;
    }
  }
};

const updateRecoverPassowrd = async () => {
  try {
    loadingRecoverPassword.value = true;
    await authService.updateRecoverPasswordService(
      param.value.email,
      param.value.password
    );
    clearObject(param.value);
    confirmPassword.value = "";
    closeModalRecoverPassword();
    message.value = "Senha redefinida com sucesso!";
    showToast.value = true;
  } catch (error: any) {
    if (error.response?.status !== 401) {
      message.value = "Ocorreu um erro ao redefinir a senha, por favor entre em contato conosco.";
      showToast.value = true;
    }
  } finally {
    loadingRecoverPassword.value = false;
  }
};

const closeModalRecoverPassword = () => {
  emit('update:showModalRecoverPassword', false);
  clearObject(param.value);
  stepRecoverPassword.value = 1;
  dataUser.value = undefined;
};

const isStepOneRecoverPassword = computed(() => {
  return (
    param.value.email &&
    param.value.firtQuestionAnswer &&
    param.value.secoundQuestionAnswer &&
    param.value.trirdQuestionAnswer
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
    {
      text: "Senha e confirmação iguais",
      valid: pwd === confirmPassword.value && pwd.length > 0,
    },
  ];
});

const isStepThreeRecoverPassowordValid = computed(() =>
  passwordRules.value.every((rule) => rule.valid)
);
</script>

<template>
  <!-- ##################### STEP 1 ##################### -->
  <ion-modal :is-open="props.showModalRecoverPassword">
    <ion-header>
      <ion-toolbar>
        <ion-title>Recuperar senha</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModalRecoverPassword()">Fechar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h5 class="modal-title">Por questões de segurança, por favor preencha as informações abaixo:</h5>
      <div v-if="stepRecoverPassword === 1">
        <p class="label-text">Qual o seu e-mail cadastrado ?</p>
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
              @click="loadUser()"
            ></ion-icon>
          </ion-input>
        </ion-item>

        <div class="spinner-container">
          <ion-spinner v-if="loadingUser" color="secondary"></ion-spinner>
        </div>

        <div v-if="dataUser">
          <p class="label-text">{{ checkFirtQuestion }}</p>
          <ion-item class="custom-input custom-select" lines="none">
            <ion-select
              v-model="param.firtQuestionAnswer"
              interface="action-sheet"
              placeholder="* Resposta"
              :maxlength="100"
              class="select-field"
            >
              <ion-select-option value="Austrália">Austrália</ion-select-option>
              <ion-select-option value="Finlândia">Finlândia</ion-select-option>
              <ion-select-option :value="checkFirtQuestionAnswer">{{ checkFirtQuestionAnswer }}</ion-select-option>
            </ion-select>
          </ion-item>

          <p class="label-text">{{ checkSecoundQuestion }}</p>
          <ion-item class="custom-input custom-select" lines="none">
            <ion-select
              v-model="param.secoundQuestionAnswer"
              interface="action-sheet"
              placeholder="* Resposta"
              :maxlength="100"
              class="select-field"
            >
              <ion-select-option value="Disney">Disney</ion-select-option>
              <ion-select-option value="Cataratas do Iguaçu">Cataratas do Iguaçu</ion-select-option>
              <ion-select-option :value="checkSecoundQuestionAnswer">{{ checkSecoundQuestionAnswer }}</ion-select-option>
            </ion-select>
          </ion-item>

          <p class="label-text">{{ checkTrirdQuestion }}</p>
          <ion-item class="custom-input custom-select" lines="none">
            <ion-select
              v-model="param.trirdQuestionAnswer"
              interface="action-sheet"
              placeholder="* Resposta"
              :maxlength="100"
              class="select-field"
            >
              <ion-select-option value="Meias Esportivas">Meias Esportivas</ion-select-option>
              <ion-select-option value="Óculos de Sol">Óculos de Sol</ion-select-option>
              <ion-select-option :value="checkTrirdQuestionAnswer">{{ checkTrirdQuestionAnswer }}</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-button
            expand="block"
            shape="round"
            class="card-button"
            @click="sendMailToRecoverPassword"
            :disabled="!isStepOneRecoverPassword"
          >
            Verificar
          </ion-button>
        </div>
      </div>
      
      <!-- ##################### STEP 2 ##################### -->
      <div v-if="stepRecoverPassword === 2">
        <p class="label-text">Enviamos um um e-mail para {{ param.email }} para validação de código.</p>
        <ion-input-otp>Não recebeu o código ? <span>Reenviar código</span></ion-input-otp>
        <ion-button
          expand="block"
          shape="round"
          class="card-button"
          @click="stepRecoverPassword = 3"
        >
          Verificar
        </ion-button>
      </div>

      <!-- ##################### STEP 3 ##################### -->
      <div v-if="stepRecoverPassword === 3">
        <ion-item class="custom-input" lines="none">
          <ion-input
            type="password"
            placeholder="* Senha"
            :maxlength="100"
            v-model="param.password"
            class="input-field"
          >
            <ion-input-password-toggle slot="end" />
          </ion-input>
        </ion-item>

        <ion-item class="custom-input" lines="none">
          <ion-input
            type="password"
            placeholder="* Confime a senha"
            :maxlength="100"
            v-model="confirmPassword"
            class="input-field"
          >
            <ion-input-password-toggle slot="end" />
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
          @click="updateRecoverPassowrd()"
          :disabled="!isStepThreeRecoverPassowordValid"
        >
          <template v-if="loadingRecoverPassword">
            <ion-spinner name="crescent"></ion-spinner>
          </template>
          <template v-else> Redefinir Senha </template>
        </ion-button>
      </div>
    </ion-content>
  </ion-modal>

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
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: #2a947d;
}

.password-rules-list li.invalid {
  color: #d03a52;
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

.modal-title {
  text-align: center;
  margin-top: 32px;
  margin-bottom: 40px;
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
