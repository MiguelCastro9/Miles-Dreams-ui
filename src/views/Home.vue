<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import { Plane, Flame } from "@vicons/tabler";
</script>

<template>
  <ion-page>
    <ion-header>
      <NavbarComponent />
    </ion-header>
    <ion-content :fullscreen="true" class="home-content">
      <div class="section-title">Ofertas</div>

      <swiper
        :slides-per-view="1.2"
        :space-between="10"
        class="mySwiper"
      >
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

      <div class="section-title">Viagens em andamento</div>

      <ion-list class="settings-list">
        <ion-item lines="none">
          <Plane class="icon-item" />
          <ion-label>Portugal - Brasil</ion-label>
        </ion-item>
        <ion-item lines="none">
          <Plane class="icon-item" />
          <ion-label>Portugal - Japão</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.home-content {
  --background: #f7f8fa;
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.settings-list {
  margin: 16px 8px 0 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin-bottom: 20px;
}

.icon-item {
  width: 22px;
  height: 22px;
  margin-right: 14px;
  color: #3d72ed;
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

/* Dark theme overrides */
@media (prefers-color-scheme: dark) {
  .home-content {
    --background: #181818;
  }

  .settings-list {
    background: #242424;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
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
}
</style>

