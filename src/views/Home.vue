<template>
    <div>
        <v-carousel hide-delimiters cycle="1">
            <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
                <img :src="item.image" :alt="'Carousel Image ' + index">
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            carouselItems: [
                { image: 'path/to/image1.jpg' },
                { image: 'path/to/image2.jpg' },
                { image: 'path/to/image3.jpg' }
            ]
        };
    }
};
</script>
