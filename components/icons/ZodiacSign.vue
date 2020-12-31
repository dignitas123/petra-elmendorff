<template>
  <svg @click="$emit('arrow-click')"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    role="img"
    viewBox="0 0 512 512"
    style="fill: #593f4c;"
    xml:space="preserve"
    id="downarrow"
    class="icon-animation-shake mt-5"
  >
    <path d="m326 441c0 11.046-8.954 20-20 20h-30v31c0 11.046-8.954 20-20 20s-20-8.954-20-20v-31h-30c-11.046 0-20-8.954-20-20s8.954-20 20-20h30v-38.092c0-14.139-10.227-26.494-24.316-29.377-48.93-10.012-93.478-36.854-125.438-75.582-32.402-39.261-50.246-88.963-50.246-139.949 0-11.046 8.954-20 20-20s20 8.954 20 20c0 85.141 60.436 159.304 143.703 176.343 32.62 6.675 56.297 35.511 56.297 68.565v38.092h30c11.046 0 20 8.954 20 20zm70-301c0 77.196-62.804 140-140 140s-140-62.804-140-140 62.804-140 140-140 140 62.804 140 140zm-40 0c0-55.14-44.859-100-100-100s-100 44.86-100 100 44.859 100 100 100 100-44.86 100-100zm-27.402 205.734c88.166-30.81 147.402-114.292 147.402-207.734 0-11.046-8.954-20-20-20s-20 8.954-20 20c0 76.459-48.465 144.766-120.598 169.974-10.428 3.644-15.927 15.051-12.282 25.478 2.881 8.245 10.613 13.408 18.88 13.408 2.188-.001 4.415-.363 6.598-1.126z"/>
  </svg>
</template>

<style scoped lang="scss">
#downarrow:hover {
  cursor: pointer;
}

.icon-animation-shake {
  animation-name: shake;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: 2s;
}

@keyframes shake {
  0% {
  }
  5%,
  25% {
    transform: translateY(5px);
  }
  15%,
  35% {
    transform: translate(-1px);
  }
  40% {
    transform: translate(0);
  }
}
</style>
