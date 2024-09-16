<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <MDBFooter
    bg="none"
    :text="['center', 'white']"
    style="background-color: teal"
  >
    <!-- Grid container -->
    <MDBContainer class="p-4 pb-0">
      <!-- Section: CTA -->
      <section class="">
        <p class="d-flex justify-content-center align-items-center">
          <span class="me-3">Register for free</span>
          <v-btn outline="light" rounded @click="viewsignup()"> Sign up! </v-btn>
        </p>
      </section>
      <!-- Section: Social media -->
      <section class="mb-4 d-flex justify-content-center">
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com" role="button" target="_blank">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.twitter.com" role="button" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com" role="button" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com" role="button" target="_blank">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a class="btn btn-outline-light btn-floating m-1" href="https://wa.me/yourwhatsappnumber" role="button" target="_blank">
          <i class="fab fa-whatsapp"></i>
        </a>
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com" role="button" target="_blank">
          <i class="fab fa-youtube"></i>
        </a>
      </section>
      <section class="text-center">
        <h6>Contact Us </h6>
      </section>
    </MDBContainer>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2024 Tech Mahindra
    </div>
  </MDBFooter>
</template>

<script>
export default {
  methods: {
    viewsignup() {
      this.$router.push('/signup');
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>