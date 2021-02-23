<template>
  <scroll-to-top>
    <div class="back-to-top">
      <svg
        width="25px"
        role="img"
        viewBox="220 199 50 50"
        style="enable-background:new 0 0 490 490; fill: #e3d259;"
        xml:space="preserve"
        id="downarrow"
        transform="rotate(180)"
      >
        <path
          d="M244.992,474.194L490,474.194z M244.995,248.759l-69.472-129.986h138.951L244.995,248.759z"
        />
      </svg>
    </div>
  </scroll-to-top>
</template>

<style scoped lang="scss">
.back-to-top {
  // border-radius: 8px;
  // background-color: rgba(89, 63, 76, 0.1);
  // padding: 5px 5px 5px 5px;
  color: #593f4c;
  // &:hover {
  //   background-color: rgba(89, 63, 76, 0.5);
  // }
}

#backToTop {
  fill: #6e5e66;
  &:hover {
    fill: #593f4c;
  }
}
</style>
