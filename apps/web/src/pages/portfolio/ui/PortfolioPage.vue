<script setup lang="ts">
import { NCard, NH1, NP, NTag } from 'naive-ui'
</script>

<template>
  <main class="portfolio-page">
    <section class="portfolio-page__content">
      <NTag type="success" size="small" :bordered="false"> Основа проекта готова </NTag>
      <NH1 class="portfolio-page__title"> Trade Note </NH1>
      <NP depth="3" class="portfolio-page__description">
        Здесь появится портфель с активами, валютами и пересчётом общей стоимости.
      </NP>

      <NCard title="Портфель" embedded>
        Первый экран подключён. Следующий этап — модель данных и локальное хранилище.
      </NCard>
    </section>
  </main>
</template>

<style scoped>
.portfolio-page {
  min-height: 100vh;
  padding: 24px 16px;
}

.portfolio-page__content {
  width: min(100%, 1120px);
  margin: 0 auto;
}

.portfolio-page__title {
  margin: 16px 0 4px;
}

.portfolio-page__description {
  max-width: 680px;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .portfolio-page {
    padding: 48px 32px;
  }
}
</style>
