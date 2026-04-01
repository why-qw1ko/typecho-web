<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>