<template>
  <div class="star-rating">
    <div class="star-rating-top" style="width: var(--filled-percent)">
      <span>★★★★★</span>
    </div>
    <div class="star-rating-bottom">
      <span>★★★★★</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  computed: {
    filledPercent() {
      const maxRating = 5;
      return `${(this.rating / maxRating) * 100}%`;
    }
  },
  mounted() {
    this.$el.style.setProperty('--filled-percent', this.filledPercent);
  }
};
</script>

<style scoped>
.star-rating {
  position: relative;
  display: inline-block;
  font-size: var(--star-size, 24px);
  color: var(--star-background-color, #fc0);
}

.star-rating-top {
  color: var(--star-color, #fc0);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
}

.star-rating-bottom {
  padding-top: 1px; /* Adjust based on your font size for better alignment */
  color: var(--star-background-color, #ccc); /* Color of unfilled stars */
  display: block;
}
</style>