<template>
  <div class="menue-content-mobile" @mouseover="$nuxt.$emit('menu-hover')">
    <div class="d-grid">
      Menue
    </div>
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
        viewBox="0 0 50 50"
      >
        <rect y="3" width="50" height="1" />
        <rect y="13" width="50" height="1" />
        <rect y="23" width="50" height="1" />
        <rect y="33" width="50" height="1" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/styles/custom-properties';

.menue-content-mobile {
  color: #593f4c;
  font-size: 12px;
  letter-spacing: -1px;
  font-family: var(--font-family-sans-bold);
}
</style>
