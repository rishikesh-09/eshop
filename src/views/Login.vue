<template>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<section class="vh-100">

    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
            <v-img src="src\assests\logo.png" class="ml-3"></v-img>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <v-form @submit.prevent="login" ref="form">
            <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p class="lead fw-normal mb-0 me-3 ">Sign in with</p>
              <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-floating mx-1">
                <i class="fab fa-facebook-f"></i>
              </button>
  
              <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-floating mx-1">
                <i class="fab fa-twitter"></i>
              </button>
  
              <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-floating mx-1">
                <i class="fab fa-linkedin-in"></i>
              </button>
            </div>
  
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">Or</p>
            </div>
  
            
            <div data-mdb-input-init class="form-outline mb-4">
              <input v-model="email"
                label="Email Your Name"
                name="email" type="email" class="form-control form-control-lg"
              id="form3Example3" placeholder="Enter your name"  />
              <label class="form-label" for="form3Example3">Email address</label>
            </div>
  
            
            <div data-mdb-input-init class="form-outline mb-3">
              <input type="password" id="form3Example4" class="form-control form-control-lg"
                placeholder="Enter password" 
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                />
                
              <label class="form-label" for="form3Example4">Password</label>
            </div>
  
            <div class="d-flex justify-content-between align-items-center">
              
              <div class="form-check mb-0">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                <label class="form-check-label" for="form2Example3">
                  Remember me
                </label>
              </div>
              <a href="#!" class="text-body">Forgot password?</a>
            </div>
  
            <div class="text-center text-lg-start mt-4 pt-2">
                <v-btn color="primary" @click="login">Login</v-btn>
              <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href=""
                  class="link-danger"@click="$router.push('/signup')">Register</a></p>
            </div>
          </v-form>
        </div>
      </div>
    </div>
    
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const form = ref(null);

const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('');

const rules = {
  required: value => !!value || 'Required.',
  email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
};

const login = async () => {
  const { valid } = await form.value.validate();
  
  if (valid) {
    try {
      await authStore.login(email.value, password.value);
      router.push('/home');
    } catch (error) {
      snackbarText.value = error.message;
      snackbarColor.value = 'error';
      snackbar.value = true;
    }
  }
};
</script>
<style scoped>
.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}
</style> 

  

  