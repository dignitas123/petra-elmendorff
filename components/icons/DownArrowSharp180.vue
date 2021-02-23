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
      d="M489.229,442.468L254.563,37.135c-3.797-6.592-14.677-6.592-18.453,0L1.443,442.468c-1.92,3.307-1.92,7.36-0.021,10.667    c1.92,3.307,5.44,5.333,9.259,5.333h469.333c3.819,0,7.339-2.027,9.259-5.333C491.128,449.849,491.128,445.775,489.229,442.468z"
    />
  </svg>
</template>

<style scoped>
#downarrow {
  margin-top: 20px;
  margin-bottom: 20px;
  bottom: 0;
}

#downarrow:hover {
  cursor: pointer;
}

@media (min-width: 994px) {
  #downarrow {
    width: 45px;
  }
}
</style>
