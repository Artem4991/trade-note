<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui';

import { PortfolioPage } from '@/pages/portfolio';
</script>

<template>
  <NConfigProvider>
    <NMessageProvider>
      <PortfolioPage />
    </NMessageProvider>
  </NConfigProvider>
</template>
