<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { AuthService } from "@/services/auth/AuthService";
import router from "@/router/index.ts";
import { useRoute } from "vue-router";
import { Login } from "@/types/auth/Login";
import { User } from "@/types/auth/User";
import { RecoverPassword } from "@/types/auth/RecoverPassword";
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
  IonTitle,
  IonInputOtp
} from "@ionic/vue";
import { searchSharp } from "ionicons/icons";

const route = useRoute();
const authService = new AuthService();
const dataRpaUser = ref<User | undefined>(undefined);
const dataUser = ref<User | undefined>(undefined);
const loadingLogin = ref(false);
const loadingRpaUser = ref(false);
const loadingUser = ref(false);
const loadingRecoverPassword = ref(false);
const loadingRegister = ref(false);
const isLogin = ref(true);
const message = ref();
const showToast = ref(false);
const confirmPassword = ref("");
const confirmRecoverPassoword = ref("");
const stepRegister = ref(1);
const checkFirtQuestion = ref("");
const checkFirtQuestionAnswer = ref("");
const checkSecoundQuestion = ref("");
const checkSecoundQuestionAnswer = ref("");
const checkTrirdQuestion = ref("");
const checkTrirdQuestionAnswer = ref("");
const modalRecoverPassword = ref(false);
const stepRecoverPassword = ref(1);

const paramLogin = ref<Login>({
  username: "",
  password: ""
});
const paramUser = ref<User>({
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

const paramRecoverPassword = ref<RecoverPassword>({
  email: "",
  firtQuestionAnswer: "",
  secoundQuestionAnswer: "",
  trirdQuestionAnswer: "",
  newPassword: ""
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
      message.value = "Usuário ou senha inválidos.";
      showToast.value = true;
      clearObject(paramLogin.value);
    } else {
      message.value = "Ocorreu um erro no login, por favor entre em contato conosco.";
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
    if (dataRpaUser.value) {
      paramUser.value.name = dataRpaUser.value.name;
      paramUser.value.lastname = dataRpaUser.value.lastname;
      paramUser.value.gender = dataRpaUser.value.gender;
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

const loadUser = async () => {
  try {
    loadingUser.value = true;
    const data = await authService.loadUserService(paramRecoverPassword.value.email);
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
      message.value = "Ocorreu um erro buscar usuário, por favor entre em contato conosco.";
      showToast.value = true;
    }
  } finally {
    loadingUser.value = false;
  }
};

const authRegister = async () => {
  try {
    loadingRegister.value = true;
    const data = await authService.registerService(paramUser.value);
    localStorage.setItem("token", data.token);
    loadingRegister.value = false;
    clearObject(paramUser.value);
    confirmPassword.value = "";
    handleRedirectToLogin();
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

const updateRecoverPassowrd = async () => {
  try {
    loadingRecoverPassword.value = true;
    await authService.updateRecoverPasswordService(paramRecoverPassword.value.email, paramRecoverPassword.value.newPassword);
    loadingRecoverPassword.value = false;
    clearObject(paramRecoverPassword.value);
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
    loadingRegister.value = false;
  }
};

const sendMailToRecoverPassword = async () => {
  try {
    let correctAnswers = 0;
    if (paramRecoverPassword.value.firtQuestionAnswer === dataUser.value?.firtQuestionAnswer) {
      correctAnswers++;
    }
    if (paramRecoverPassword.value.secoundQuestionAnswer === dataUser.value?.secoundQuestionAnswer) {
      correctAnswers++;
    }
    if (paramRecoverPassword.value.trirdQuestionAnswer === dataUser.value?.trirdQuestionAnswer) {
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
      message.value =  "Ocorreu um erro ao enviar e-mail de recuperação de senha, por favor entre em contato conosco.";
      showToast.value = true;
    }
  } finally {
    loadingRegister.value = false;
  }
};

const handleRedirectToLogin = () => {
  isLogin.value = !isLogin.value;
};

const closeModalRecoverPassword = () => {
  modalRecoverPassword.value = false;
  clearObject(paramRecoverPassword.value);
  stepRecoverPassword.value = 1;
  dataUser.value = undefined;
};

const isStepOneRegisterValid = computed(() => {
  return (
    paramUser.value.email &&
    paramUser.value.username &&
    paramUser.value.name &&
    paramUser.value.lastname &&
    paramUser.value.gender
  );
});

const passwordRegisterRules = computed(() => {
  const pwd = paramUser.value.password || "";
  const email = paramUser.value.email || "";

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
  passwordRegisterRules.value.every(rule => rule.valid)
);


const isStepThreeRegisterValid = computed(() => {
  return (
    paramUser.value.firtQuestion &&
    paramUser.value.firtQuestionAnswer &&
    paramUser.value.secoundQuestion &&
    paramUser.value.secoundQuestionAnswer &&
    paramUser.value.trirdQuestionAnswer &&
    paramUser.value.trirdQuestionAnswer
  );
});

const isStepOneRecoverPassword = computed(() => {
  return (
    paramRecoverPassword.value.email &&
    paramRecoverPassword.value.firtQuestionAnswer &&
    paramRecoverPassword.value.secoundQuestionAnswer &&
    paramRecoverPassword.value.trirdQuestionAnswer
  );
});

const passwordRecoverPasswordRules = computed(() => {
  const pwd = paramRecoverPassword.value.newPassword || "";
  const email = paramRecoverPassword.value.email || "";

  return [
    { text: "Mínimo de 8 caracteres", valid: pwd.length >= 8 },
    { text: "Pelo menos 1 letra maiúscula", valid: /[A-Z]/.test(pwd) },
    { text: "Pelo menos 1 letra minúscula", valid: /[a-z]/.test(pwd) },
    { text: "Pelo menos 1 número", valid: /\d/.test(pwd) },
    { text: "Não pode ser igual ao e-mail", valid: pwd !== email },
    { text: "Senha e confirmação iguais", valid: pwd === confirmRecoverPassoword.value && pwd.length > 0 }
  ];
});

const isStepThreeRecoverPassowordValid = computed(() =>
  passwordRecoverPasswordRules.value.every(rule => rule.valid)
);

watch(() => paramUser.value.email, (newEmail) => {
    const atIndex = newEmail.indexOf("@");
    if (atIndex !== -1) {
      paramUser.value.username = newEmail.substring(0, atIndex);
    } else {
      paramUser.value.username = "";
    }
  }
);

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

        <h1 class="card-title">{{ isLogin ? "Bem-vindo" : "Crie sua conta" }}</h1>
        <p class="card-subtitle">
          {{
            isLogin
              ? "Faça login para continuar"
              : "Comece sua jornada conosco, primeiro informe seu e-mail para sabermos se você é nosso cliente e então siga os próximos passos"
          }}
        </p>

        <!-- ##################### LOGIN ##################### -->
        <div class="card-form" v-if="isLogin">
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
              type="password"
              placeholder="* Senha"
              :maxlength="100"
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
            <p
              href="#"
              @click.prevent="modalRecoverPassword = true"
              class="card-link"
            >
              Esqueceu sua senha ?
            </p>
            <p>
              Ainda não tem uma conta ?
              <span @click="handleRedirectToLogin" class="card-link">
                Regitre-se
              </span>
            </p>
          </div>
        </div>

        <!-- ##################### REGISTER STEP 1 ##################### -->
        <div class="card-form" v-if="!isLogin && stepRegister === 1">
          <ion-item class="custom-input" lines="none">
            <ion-input
              type="text"
              placeholder="* E-mail"
              :maxlength="100"
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
                v-model="paramUser.username"
                class="input-field"
              />
            </ion-item>

            <ion-item class="custom-input" lines="none">
              <ion-input
                type="text"
                placeholder="* Nome"
                :maxlength="100"
                v-model="paramUser.name"
                class="input-field"
              />
            </ion-item>

            <ion-item class="custom-input" lines="none">
              <ion-input
                type="text"
                placeholder="* Sobrenome"
                :maxlength="100"
                v-model="paramUser.lastname"
                class="input-field"
              />
            </ion-item>

            <ion-item class="custom-input custom-select" lines="none">
              <ion-select
                interface="action-sheet"
                placeholder="* Gênero"
                :maxlength="100"
                v-model="paramUser.gender"
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
            <div class="card-footer">
              <p>
                Já tem uma conta ?
                <a href="#" @click.prevent="handleRedirectToLogin" class="card-link">
                  Entrar
                </a>
              </p>
            </div>
        </div>

        <!-- ##################### REGISTER STEP 2 ##################### -->
        <div class="card-form" v-if="!isLogin && stepRegister === 2">
          <ion-item class="custom-input" lines="none">
            <ion-input
              type="password"
              placeholder="* Senha"
              :maxlength="100"
              v-model="paramUser.password"
              class="input-field"
            >
              <ion-input-password-toggle slot="end" />
            </ion-input>
          </ion-item>

          <ion-item class="custom-input" lines="none">
            <ion-input
              type="password"
              placeholder="* Confirme a senha"
              :maxlength="100"
              v-model="confirmPassword"
              class="input-field"
            >
              <ion-input-password-toggle slot="end" />
            </ion-input>
          </ion-item>

          <ul class="rules-list">
            <li v-for="rule in passwordRegisterRules" :key="rule.text" :class="{ valid: rule.valid, invalid: !rule.valid }">
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

        <!-- ##################### REGISTER STEP 3 ##################### -->
        <div class="card-form" v-if="!isLogin && stepRegister === 3">
            <p class="question-text">Escolha a primeira pergunta de segurança:</p>
            <ion-item class="custom-input custom-select" lines="none">
              <ion-select
                interface="action-sheet"
                placeholder="* Escolha"
                :maxlength="100"
                v-model="paramUser.firtQuestion"
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
              v-model="paramUser.firtQuestionAnswer"
              class="input-field"
            >
            </ion-input>
          </ion-item>

            <p class="question-text">Escolha a segunda pergunta de segurança:</p>
            <ion-item class="custom-input custom-select" lines="none">
              <ion-select
                interface="action-sheet"
                placeholder="* Escolha"
                :maxlength="100"
                v-model="paramUser.secoundQuestion"
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
              v-model="paramUser.secoundQuestionAnswer"
              class="input-field"
            >
            </ion-input>
          </ion-item>

            <p class="question-text">Escolha a terceira pergunta de segurança:</p>
            <ion-item class="custom-input custom-select" lines="none">
              <ion-select
                interface="action-sheet"
                placeholder="* Escolha"
                :maxlength="100"
                v-model="paramUser.trirdQuestion"
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
              v-model="paramUser.trirdQuestionAnswer"
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

        <!-- ##################### MODAL RECOVER PASSWORD STEP 1 ##################### -->
        <ion-modal :is-open="modalRecoverPassword">
          <ion-header>
            <ion-toolbar>
              <ion-title>Recuperar senha</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="closeModalRecoverPassword();"
                  >Fechar</ion-button
                >
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <h5 class="modal-title">
              Por questões de segurança, por favor preencha as informações abaixo:
            </h5>
            <div v-if="stepRecoverPassword === 1">
              <p class="question-text">Qual o seu e-mail cadastrado ?</p>
              <ion-item class="custom-input" lines="none">
                <ion-input
                  type="text"
                  placeholder="* E-mail"
                  :maxlength="100"
                  v-model="paramRecoverPassword.email"
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
                <p class="question-text">{{ checkFirtQuestion }}</p>
                <ion-item class="custom-input custom-select" lines="none">
                  <ion-select
                    v-model="paramRecoverPassword.firtQuestionAnswer"
                    interface="action-sheet"
                    placeholder="* Resposta"
                    :maxlength="100"
                    class="select-field"
                  >
                    <ion-select-option value="Austrália">Austrália</ion-select-option>
                    <ion-select-option value="Finlândia">Finlândia</ion-select-option>
                    <ion-select-option :value="checkFirtQuestionAnswer">{{
                      checkFirtQuestionAnswer
                    }}</ion-select-option>
                  </ion-select>
                </ion-item>

                <p class="question-text">{{ checkSecoundQuestion }}</p>
                <ion-item class="custom-input custom-select" lines="none">
                  <ion-select
                    v-model="paramRecoverPassword.secoundQuestionAnswer"
                    interface="action-sheet"
                    placeholder="* Resposta"
                    :maxlength="100"
                    class="select-field"
                  >
                    <ion-select-option value="Disney">Disney</ion-select-option>
                    <ion-select-option value="Cataratas do Iguaçu">Cataratas do Iguaçu</ion-select-option>
                    <ion-select-option :value="checkSecoundQuestionAnswer">{{
                      checkSecoundQuestionAnswer
                    }}</ion-select-option>
                  </ion-select>
                </ion-item>

                <p class="question-text">{{ checkTrirdQuestion }}</p>
                <ion-item class="custom-input custom-select" lines="none">
                  <ion-select
                    v-model="paramRecoverPassword.trirdQuestionAnswer"
                    interface="action-sheet"
                    placeholder="* Resposta"
                    :maxlength="100"
                    class="select-field"
                  >
                    <ion-select-option value="Meias Esportivas">Meias Esportivas</ion-select-option>
                    <ion-select-option value="Óculos de Sol">Óculos de Sol</ion-select-option>
                    <ion-select-option :value="checkTrirdQuestionAnswer">{{
                      checkTrirdQuestionAnswer
                    }}</ion-select-option>
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
            <!-- ##################### MODAL RECOVER PASSWORD STEP 2 ##################### -->
            <div v-if="stepRecoverPassword === 2">
              <p class="question-text">Enviamos um um e-mail para {{ paramRecoverPassword.email }} para validação de código.</p>
              <ion-input-otp> Não recebeu o código ? <a href="#">Reenviar código</a> </ion-input-otp>
            
                <ion-button
                  expand="block"
                  shape="round"
                  class="card-button"
                  @click="stepRecoverPassword = 3"
                >
                  Verificar
                </ion-button>
            </div>

            <!-- ##################### MODAL RECOVER PASSWORD STEP 3 ##################### -->
            <div v-if="stepRecoverPassword === 3">
              <ion-item class="custom-input" lines="none">
                <ion-input
                  type="password"
                  placeholder="* Senha"
                  :maxlength="100"
                  v-model="paramRecoverPassword.newPassword"
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
                  v-model="confirmRecoverPassoword"
                  class="input-field"
                >
                  <ion-input-password-toggle slot="end" />
                </ion-input>
              </ion-item>

              <ul class="rules-list">
                <li v-for="rule in passwordRecoverPasswordRules" :key="rule.text" :class="{ valid: rule.valid, invalid: !rule.valid }">
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

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rules-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 10px;
}

.rules-list li {
  font-size: 0.9rem;
  margin: 2px 0;
}

.rules-list li.valid {
  color: #2A947D;
}

.rules-list li.invalid {
  color:
   #D03A52;
}
.question-text {
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
