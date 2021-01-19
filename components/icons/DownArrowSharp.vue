<template>
  <svg
    @click="$emit('arrow-click')"
    xmlns="http://www.w3.org/2000/svg"
    width="25px"
    role="img"
    viewBox="220 199 50 50"
    style="enable-background:new 0 0 490 490; fill: #e3d259;"
    xml:space="preserve"
    id="downarrow"
  >
    <path
      d="M244.992,474.194L490,474.194z M244.995,248.759l-69.472-129.986h138.951L244.995,248.759z"
    />
  </svg>
</template>

<style scoped>
#downarrow {
  margin-bottom: 10px;
}

#downarrow:hover {
  cursor: pointer;
}
</style>
