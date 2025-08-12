<script setup lang="ts">
import { ref } from "vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  IonModal,
  IonCardSubtitle,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonSearchbar,
} from "@ionic/vue";
import { Flame, Plane } from "@vicons/tabler";

const isOpen = ref(false);

const setOpen = (value: boolean) => {
  isOpen.value = value;
};

const travel1 = {
  code: "63X0-AC1",
  price: "€300,00",
  total_connection: 1,
  connection_time: "2h 30m",
  airline_company: "Air France",
  flight_number_01: "AF1234",
  origin_01: "Lisboa Airport (LIS) - Portugal",
  country_origin_01: "Portugal",
  country_destiny_01: "França",
  country_destiny_02: "Brasil",
  country_origin_02: "França",
  destiny_01: "France Airport (CDG) - França",
  flight_number_02: "AF4321",
  origin_02: "France Airport (CDG) - França",
  destiny_02: "São Paulo Airport (GRU) - Brasil",
  departure_01: "15/02/2026 - 12:00",
  arrival_01: "15/02/2026 - 16:00",
  departure_02: "15/02/2026 - 18:30",
  arrival_02: "16/02/2026 - 05:00",
  status: "Em andamento",
  baggage: "1 mala de 23kg",
  name: "Iara Costa",
  email: "iara@email.com",
  phone: "+55 11 91234-5678",
};

const travel2 = {
  code: "18D5-FG5",
  price: "€485,00",
  total_connection: 1,
  connection_time: "2h 30m",
  airline_company: "Air France",
  flight_number_01: "AF1234",
  origin_01: "Lisboa Airport (LIS) - Portugal",
  country_origin_01: "Portugal",
  country_destiny_01: "Alemanha",
  country_destiny_02: "Japão",
  country_origin_02: "Alemanha",
  destiny_01: "Frankfurt Airport (FRA) - Alemanha",
  flight_number_02: "AF4321",
  origin_02: "Frankfurt Airport (FRA) - Alemanha",
  destiny_02: "Tokyo Narita Airport (NRT) - Japão",
  departure_01: "15/02/2026 - 12:00",
  arrival_01: "15/02/2026 - 16:00",
  departure_02: "15/02/2026 - 18:30",
  arrival_02: "16/02/2026 - 05:00",
  status: "Em andamento",
  baggage: "1 mala de 23kg",
  name: "Iara Costa",
  email: "iara@email.com",
  phone: "+55 11 91234-5678",
};

const travel3 = {
  code: "23F9-AE1",
  price: "€324,30",
  total_connection: 1,
  connection_time: "2h 30m",
  airline_company: "Air France",
  flight_number_01: "AF1234",
  origin_01: "Lisboa Airport (LIS) - Portugal",
  country_origin_01: "Portugal",
  country_destiny_01: "Espanha",
  country_destiny_02: "Argentina",
  country_origin_02: "Espanha",
  destiny_01: "Madrid Airport (MAD) - Espanha",
  flight_number_02: "AF4321",
  origin_02: "Madrid Airport (MAD) - Espanha",
  destiny_02: "Ezeiza Airport (EZE) - Argentina",
  departure_01: "15/02/2026 - 12:00",
  arrival_01: "15/02/2026 - 16:00",
  departure_02: "15/02/2026 - 18:30",
  arrival_02: "16/02/2026 - 05:00",
  status: "Finalizada",
  baggage: "1 mala de 23kg",
  name: "Iara Costa",
  email: "iara@email.com",
  phone: "+55 11 91234-5678",
};

const travel4 = {
  code: "64X0-AR6",
  price: "€640,20",
  total_connection: 1,
  connection_time: "2h 30m",
  airline_company: "Air France",
  flight_number_01: "AF1234",
  origin_01: "Lisboa Airport (LIS) - Portugal",
  country_origin_01: "Portugal",
  country_destiny_01: "Itália",
  country_destiny_02: "Austrália",
  country_origin_02: "Itália",
  destiny_01: "Rome Fiumicino Airport (FCO) - Itália",
  flight_number_02: "AF4321",
  origin_02: "Rome Fiumicino Airport (FCO) - Itália",
  destiny_02: "Sydney Airport (SYD) - Austrália",
  departure_01: "15/02/2026 - 12:00",
  arrival_01: "15/02/2026 - 16:00",
  departure_02: "15/02/2026 - 18:30",
  arrival_02: "16/02/2026 - 05:00",
  status: "Cancelada",
  baggage: "1 mala de 23kg",
  name: "Iara Costa",
  email: "iara@email.com",
  phone: "+55 11 91234-5678",
};
</script>

<template>
  <ion-page>
    <ion-header>
      <NavbarComponent />
    </ion-header>
    <ion-content :fullscreen="true" class="offers-content">
      <ion-segment class="segment-menu">
        <ion-segment-button value="offers" content-id="offers">
          <ion-label>Promoções</ion-label>
        </ion-segment-button>
        <ion-segment-button value="myTrips" content-id="myTrips">
          <ion-label>Minhas Viagens</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-segment-view>
        <ion-segment-content id="offers">
          <div class="section-title">Promoções</div>

          <swiper :slides-per-view="1.2" :space-between="10" class="mySwiper">
            <swiper-slide>
              <ion-card>
                <img class="card-image" src="/public/germany.png" />
                <ion-card-header>
                  <ion-card-title class="card-title">
                    <span class="title-with-icon">
                      Alemanha
                      <Flame class="flame-icon" />
                    </span>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  20% de desconto em passagens para Berlim!
                </ion-card-content>
              </ion-card>
            </swiper-slide>

            <swiper-slide>
              <ion-card>
                <img class="card-image" src="/public/france.png" />
                <ion-card-header>
                  <ion-card-title class="card-title">
                    <span class="title-with-icon">
                      França
                      <Flame class="flame-icon" />
                    </span>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Explore Paris com valores promocionais. Não perca!
                </ion-card-content>
              </ion-card>
            </swiper-slide>

            <swiper-slide>
              <ion-card>
                <img class="card-image" src="/public/portugal.png" />
                <ion-card-header>
                  <ion-card-title class="card-title">
                    <span class="title-with-icon">
                      Portugal
                      <Flame class="flame-icon" />
                    </span>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Viagem completa para Lisboa com preços imperdíveis.
                </ion-card-content>
              </ion-card>
            </swiper-slide>

            <swiper-slide>
              <ion-card>
                <img class="card-image" src="/public/spain.png" />
                <ion-card-header>
                  <ion-card-title class="card-title">
                    <span class="title-with-icon">
                      Espanha
                      <Flame class="flame-icon" />
                    </span>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Ofertas especiais para Madrid por tempo limitado!
                </ion-card-content>
              </ion-card>
            </swiper-slide>
          </swiper>
        </ion-segment-content>
        <ion-segment-content id="myTrips">
          <div class="section-title">Minhas Viagens</div>
          <ion-searchbar placeholder="Buscar"></ion-searchbar>

          <ion-card class="travel-card" @click="setOpen(true)">
            <div class="travel-header">
              <div class="travel-info">
                <ion-card-title class="travel-name"
                  >{{ travel1.country_origin_01 }} <Plane class="icon-item" />
                  {{ travel1.country_destiny_02 }}</ion-card-title
                >
                <ion-card-subtitle class="travel-status-warning">{{
                  travel1.status
                }}</ion-card-subtitle>
                <div class="travel-sub-info">{{ travel1.code }}</div>
              </div>
              <div class="travel-price">
                <span>{{ travel1.price }}</span>
              </div>
            </div>
          </ion-card>

          <ion-modal :is-open="isOpen">
            <ion-header>
              <ion-toolbar>
                <ion-title>Detalhes da Viagem</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="setOpen(false)">Fechar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding modal-content">
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Passageiro:</strong>
                  <span>{{ travel1.name }}</span>
                </div>
                <div class="modal-row">
                  <strong>Email:</strong>
                  <span>{{ travel1.email }}</span>
                </div>
                <div class="modal-row">
                  <strong>Telefone:</strong>
                  <span>{{ travel1.phone }}</span>
                </div>
                <div class="modal-row">
                  <strong>Status:</strong>
                  <span>{{ travel1.status }}</span>
                </div>
                <div class="modal-row">
                  <strong>Preço:</strong>
                  <span>{{ travel1.price }}</span>
                </div>
                <div class="modal-row">
                  <strong>Código:</strong>
                  <span>{{ travel1.code }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Ida</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel1.flight_number_01 }} ({{ travel1.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel1.origin_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel1.destiny_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel1.departure_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel1.arrival_01 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Volta</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel1.flight_number_02 }} ({{ travel1.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel1.origin_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel1.destiny_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel1.departure_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel1.arrival_02 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Bagagem:</strong>
                  <span>{{ travel1.baggage }}</span>
                </div>
                <div class="modal-row">
                  <strong>Conexão:</strong>
                  <span
                    >{{ travel1.total_connection }} ({{ travel1.connection_time }})</span
                  >
                </div>
              </div>
            </ion-content>
          </ion-modal>

          <ion-card class="travel-card" @click="setOpen(true)">
            <div class="travel-header">
              <div class="travel-info">
                <ion-card-title class="travel-name"
                  >{{ travel2.country_origin_01 }} <Plane class="icon-item" />
                  {{ travel2.country_destiny_02 }}</ion-card-title
                >
                <ion-card-subtitle class="travel-status-warning">{{
                  travel2.status
                }}</ion-card-subtitle>
                <div class="travel-sub-info">{{ travel2.code }}</div>
              </div>
              <div class="travel-price">
                <span>{{ travel2.price }}</span>
              </div>
            </div>
          </ion-card>

          <ion-modal :is-open="isOpen">
            <ion-header>
              <ion-toolbar>
                <ion-title>Detalhes da Viagem</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="setOpen(false)">Fechar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding modal-content">
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Passageiro:</strong>
                  <span>{{ travel2.name }}</span>
                </div>
                <div class="modal-row">
                  <strong>Email:</strong>
                  <span>{{ travel2.email }}</span>
                </div>
                <div class="modal-row">
                  <strong>Telefone:</strong>
                  <span>{{ travel2.phone }}</span>
                </div>
                <div class="modal-row">
                  <strong>Status:</strong>
                  <span>{{ travel2.status }}</span>
                </div>
                <div class="modal-row">
                  <strong>Preço:</strong>
                  <span>{{ travel2.price }}</span>
                </div>
                <div class="modal-row">
                  <strong>Código:</strong>
                  <span>{{ travel2.code }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Ida</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel2.flight_number_01 }} ({{ travel2.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel2.origin_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel2.destiny_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel2.departure_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel2.arrival_01 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Volta</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel2.flight_number_02 }} ({{ travel2.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel2.origin_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel2.destiny_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel2.departure_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel2.arrival_02 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Bagagem:</strong>
                  <span>{{ travel2.baggage }}</span>
                </div>
                <div class="modal-row">
                  <strong>Conexão:</strong>
                  <span
                    >{{ travel2.total_connection }} ({{ travel2.connection_time }})</span
                  >
                </div>
              </div>
            </ion-content>
          </ion-modal>

          <ion-card class="travel-card" @click="setOpen(true)">
            <div class="travel-header">
              <div class="travel-info">
                <ion-card-title class="travel-name"
                  >{{ travel3.country_origin_01 }} <Plane class="icon-item" />
                  {{ travel3.country_destiny_02 }}</ion-card-title
                >
                <ion-card-subtitle class="travel-status-finished">{{
                  travel3.status
                }}</ion-card-subtitle>
                <div class="travel-sub-info">{{ travel3.code }}</div>
              </div>
              <div class="travel-price">
                <span>{{ travel3.price }}</span>
              </div>
            </div>
          </ion-card>

          <ion-modal :is-open="isOpen">
            <ion-header>
              <ion-toolbar>
                <ion-title>Detalhes da Viagem</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="setOpen(false)">Fechar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding modal-content">
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Passageiro:</strong>
                  <span>{{ travel3.name }}</span>
                </div>
                <div class="modal-row">
                  <strong>Email:</strong>
                  <span>{{ travel3.email }}</span>
                </div>
                <div class="modal-row">
                  <strong>Telefone:</strong>
                  <span>{{ travel3.phone }}</span>
                </div>
                <div class="modal-row">
                  <strong>Status:</strong>
                  <span>{{ travel3.status }}</span>
                </div>
                <div class="modal-row">
                  <strong>Preço:</strong>
                  <span>{{ travel3.price }}</span>
                </div>
                <div class="modal-row">
                  <strong>Código:</strong>
                  <span>{{ travel3.code }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Ida</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel3.flight_number_01 }} ({{ travel3.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel3.origin_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel3.destiny_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel3.departure_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel3.arrival_01 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Volta</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel3.flight_number_02 }} ({{ travel3.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel3.origin_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel3.destiny_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel3.departure_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel3.arrival_02 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Bagagem:</strong>
                  <span>{{ travel3.baggage }}</span>
                </div>
                <div class="modal-row">
                  <strong>Conexão:</strong>
                  <span
                    >{{ travel3.total_connection }} ({{ travel3.connection_time }})</span
                  >
                </div>
              </div>
            </ion-content>
          </ion-modal>

          <ion-card class="travel-card" @click="setOpen(true)">
            <div class="travel-header">
              <div class="travel-info">
                <ion-card-title class="travel-name"
                  >{{ travel4.country_origin_01 }} <Plane class="icon-item" />
                  {{ travel4.country_destiny_02 }}</ion-card-title
                >
                <ion-card-subtitle class="travel-status-canceled">{{
                  travel4.status
                }}</ion-card-subtitle>
                <div class="travel-sub-info">{{ travel4.code }}</div>
              </div>
              <div class="travel-price">
                <span>{{ travel4.price }}</span>
              </div>
            </div>
          </ion-card>

          <ion-modal :is-open="isOpen">
            <ion-header>
              <ion-toolbar>
                <ion-title>Detalhes da Viagem</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="setOpen(false)">Fechar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding modal-content">
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Passageiro:</strong>
                  <span>{{ travel4.name }}</span>
                </div>
                <div class="modal-row">
                  <strong>Email:</strong>
                  <span>{{ travel4.email }}</span>
                </div>
                <div class="modal-row">
                  <strong>Telefone:</strong>
                  <span>{{ travel4.phone }}</span>
                </div>
                <div class="modal-row">
                  <strong>Status:</strong>
                  <span>{{ travel4.status }}</span>
                </div>
                <div class="modal-row">
                  <strong>Preço:</strong>
                  <span>{{ travel4.price }}</span>
                </div>
                <div class="modal-row">
                  <strong>Código:</strong>
                  <span>{{ travel4.code }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Ida</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel4.flight_number_01 }} ({{ travel4.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel4.origin_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel4.destiny_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel4.departure_01 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel4.arrival_01 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-title">Volta</div>
                <div class="modal-row">
                  <strong>Voo:</strong>
                  <span
                    >{{ travel4.flight_number_02 }} ({{ travel4.airline_company }})</span
                  >
                </div>
                <div class="modal-row">
                  <strong>Origem:</strong>
                  <span>{{ travel4.origin_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Destino:</strong>
                  <span>{{ travel4.destiny_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Partida:</strong>
                  <span>{{ travel4.departure_02 }}</span>
                </div>
                <div class="modal-row">
                  <strong>Chegada:</strong>
                  <span>{{ travel4.arrival_02 }}</span>
                </div>
              </div>
              <div class="modal-section">
                <div class="modal-row">
                  <strong>Bagagem:</strong>
                  <span>{{ travel4.baggage }}</span>
                </div>
                <div class="modal-row">
                  <strong>Conexão:</strong>
                  <span
                    >{{ travel4.total_connection }} ({{ travel4.connection_time }})</span
                  >
                </div>
              </div>
            </ion-content>
          </ion-modal>
        </ion-segment-content>
      </ion-segment-view>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.segment-menu {
  margin-top: 20px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.offers-content {
  --background: #f7f8fa;
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.icon-item {
  margin: 0 8px;
  margin-right: 14px;
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 22px;
  color: #3d72ed;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e1e1e;
  padding: 0 16px;
  margin-top: 24px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e1e1e;
  margin-top: 8px;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 2px;
}

.flame-icon {
  width: 26px;
  height: 26px;
  margin-top: -3px;
  color: #ff5722;
}

.travel-card {
  margin: 24px 16px 16px 16px;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.travel-card:hover {
  box-shadow: 0 4px 20px 0 rgba(61, 114, 237, 0.1);
}

.travel-header {
  display: flex;
  align-items: center;
  padding: 20px 18px;
  gap: 18px;
}

.travel-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.travel-name {
  font-size: 15px;
}

.travel-status-warning {
  font-size: 12px;
  color: #fbc408;
}

.travel-status-finished {
  font-size: 12px;
  color: green;
}

.travel-status-canceled {
  font-size: 12px;
  font-weight: 500;
  color: red;
}

.travel-sub-info {
  color: #888;
  font-size: 12px;
}

.travel-price {
  font-size: 14px;
  font-weight: 700;
  color: #f26b36;
  background: #fff5ee;
  border-radius: 12px;
  padding: 8px 16px;
  min-width: 80px;
  text-align: center;
}

.modal-section {
  margin-bottom: 18px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 16px;
  font-weight: 700;
  color: #3d72ed;
  margin-bottom: 20px;
  margin-top: 10px;
}

.modal-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
  gap: 12px;
}

.modal-row strong {
  color: #222;
  font-weight: 500;
  min-width: 90px;
}

@media (prefers-color-scheme: dark) {
  .offers-content {
    --background: #181818;
  }

  .section-title,
  .card-title {
    color: #f1f1f1;
  }

  .icon-item {
    color: #82aaff;
  }

  .flame-icon {
    color: #ff784e;
  }

  .travel-card {
    background: #232a3a;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.24);
  }
  .travel-name,
  .modal-row strong,
  .modal-row span {
    color: #fff;
  }
  .travel-status {
    color: #7faaff;
  }
  .travel-price {
    background: #232a3a;
    color: #7faaff;
  }
  .ion-modal .modal-content {
    --background: #232a3a;
    box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.24);
  }
  .modal-title {
    color: #7faaff;
  }
  .modal-section {
    border-bottom: 1px solid #232a3a;
  }
}
</style>
