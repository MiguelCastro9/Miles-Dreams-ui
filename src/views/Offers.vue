<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <NavbarComponent />
    </ion-header>
    <ion-content :fullscreen="true" class="settings-content">

      <div class="section-title">Europa</div>
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
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Ofertas especiais para Madrid por tempo limitado!
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper>



      <div class="section-title">América do Sul</div>
      <swiper
        :slides-per-view="1.2"
        :space-between="10"
        class="mySwiper"
      >
        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/brazil.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Brasil
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              20% de desconto em passagens para Rio de Janeiro!
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/chile.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Chile
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Explore Santiago com valores promocionais. Não perca!
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/argentina.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Argentina
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Viagem completa para Buenos Aires com preços imperdíveis.
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/paraguai.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Paraguai
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Ofertas especiais para Foz do Iguaçu por tempo limitado!
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper>



      <div class="section-title">Ásia</div>
      <swiper
        :slides-per-view="1.2"
        :space-between="10"
        class="mySwiper"
      >
        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/japan.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Japão
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              20% de desconto em passagens para Tóquio!
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/vietnam.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Vietnã
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Explore Hanói com valores promocionais. Não perca!
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/thailand.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Tailândia
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Viagem completa para Bangkok com preços imperdíveis.
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/china.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  China
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Ofertas especiais para Pequim por tempo limitado!
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper>


      <div class="section-title">América do Norte</div>
      <swiper
        :slides-per-view="1.2"
        :space-between="10"
        class="mySwiper"
      >
        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/united-states.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Estados Unidos
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              20% de desconto em passagens para Nova Iorque!
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/canada.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Canadá
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Explore Toronto com valores promocionais. Não perca!
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/miami.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Miami
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Viagem completa para Miami com preços imperdíveis.
            </ion-card-content>
          </ion-card>
        </swiper-slide>

        <swiper-slide>
          <ion-card>
            <img class="card-image" src="/public/california.png" />
            <ion-card-header>
              <ion-card-title class="card-title">
                <span class="title-with-icon">
                  Califórnia
                </span>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Ofertas especiais para Los Angeles por tempo limitado!
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper>

    </ion-content>
  </ion-page>
</template>

<style scoped>
.settings-content {
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

/* DARK THEME */
@media (prefers-color-scheme: dark) {
  .settings-content {
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
}
</style>

