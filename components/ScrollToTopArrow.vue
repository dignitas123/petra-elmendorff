<template>
  <scroll-to-top>
    <div class="back-to-top">
      <svg
        id="backToTop"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="25px"
        height="25px"
        viewBox="0 0 337.085 337.086"
        style="enable-background:new 0 0 337.085 337.086;"
        xml:space="preserve"
      >
        <path
          d="M168.54,0C75.619,0,0.012,75.609,0.012,168.543c0,92.93,75.606,168.543,168.528,168.543   c92.933,0,168.534-75.613,168.534-168.543C337.074,75.609,261.473,0,168.54,0z M271.405,224.327   c-2.407,2.402-5.561,3.615-8.713,3.615c-3.158,0-6.311-1.213-8.719-3.615L168.54,138.9l-85.424,85.427   c-4.816,4.815-12.631,4.815-17.447,0c-4.819-4.815-4.819-12.622,0-17.438l94.152-94.141c4.822-4.815,12.613-4.815,17.426,0   l94.152,94.141C276.221,211.705,276.221,219.512,271.405,224.327z"
        />
      </svg>
    </div>
  </scroll-to-top>
</template>

<style scoped lang="scss">
.back-to-top {
  border-radius: 8px;
  background-color:rgba(89, 63, 76, 0.1);
  padding: 10px 5px 10px 5px;
  color: #593f4c;
  &:hover {
    background-color: rgba(89, 63, 76, 0.5);
  }
}

#backToTop {
  fill:  #6e5e66;
  &:hover {
    fill: #593f4c;
  }
}
</style>
