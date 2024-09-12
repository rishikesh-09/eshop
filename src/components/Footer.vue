<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
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
    </MDBContainer>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2020 Copyright:
      <a class="text-white" href="https://techmahindra.com/">techmahindra</a>
    </div>

    <!-- Copyright -->
  </MDBFooter>
</template>
<script>
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-vue-ui-kit';
export default {
    components: {
      MDBFooter,
      MDBContainer,
      MDBRow,
      MDBCol,
      MDBBtn,
    },
methods: {
  viewsignup(){
    this.$router.push('/signup');
  }
}

  
  };
</script>

