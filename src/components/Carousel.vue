<template>
<v-carousel height="265px" interval="2000" cycle>
  <v-carousel-item
    src="src/assests/First.webp"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="src/assests/Second.webp"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="src/assests/Third.webp"
    cover
  ></v-carousel-item>
  
</v-carousel>
</template>
<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
            {
                name : 'First',
                src:'src\assests\First.webp',
            },
            {
                name : 'Second',
                src:'src\assests\Second.webp',
            },
            {
                name : 'Third',
                src:'src\assests\Third.webp',
            },
         
        ],
      }
    },
  }
</script>
   