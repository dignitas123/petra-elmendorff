<template>
  <div class="menue-content-mobile-2" @mouseover="$nuxt.$emit('menu-hover')">
    <div class="d-grid">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="double-cheeseburger"
        width="35px"
        height="35px"
        id="mobileCheeseburger"
        role="img"
        fill="#593f4c"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 5 55 50"
      >
        <rect y="3" x="10" width="40" height="1" />
        <rect y="13" x="10" width="40" height="1" />
        <rect y="23" x="10" width="40" height="1" />
        <rect y="33" x="10" width="40" height="1" />
        <rect y="43" x="10" width="40" height="1" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/styles/custom-properties';

.menue-content-mobileß2 {
  color: #593f4c;
  font-size: 12px;
  letter-spacing: -1px;
  font-family: var(--font-family-sans-bold);
}
</style>
