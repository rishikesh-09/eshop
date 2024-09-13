<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
   
<section class="vh-100">
 
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
 
            <v-img src="src\assests\logo.png" class="ml-3"></v-img>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <v-form @submit.prevent="signup" ref="form">
            <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p class="lead fw-normal mb-0 me-3 ">Sign up with</p>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" class="btn btn-floating mx-1" style="background-color: teal;">
              <i class="fab fa-facebook"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" class="btn btn-floating mx-1" style="background-color: teal;">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="btn btn-floating mx-1" style="background-color: teal;">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">Or</p>
            </div>
            <!-- Email input -->
            <div data-mdb-input-init class="form-outline mb-4">
              <input type="name" id="form3Example3" class="form-control form-control-lg"
                placeholder="Enter your name " v-model="name" />
              <label class="form-label" for="form3Example3">Name</label>
            </div>
            <!-- Password input -->
            <div data-mdb-input-init class="form-outline mb-3">
              <input type="email" id="form3Example4" class="form-control form-control-lg"
                placeholder="Enter Email" v-model="email"/>
              <label class="form-label" for="form3Example4">Email Address</label>
            </div>
            <div data-mdb-input-init class="form-outline mb-3">
                <input type="password" id="form3Example4" class="form-control form-control-lg"
                    v-model="password"
                  placeholder="Enter Your Password " />
                <label class="form-label" for="form3Example4">Enter Password</label>
              </div>
            <div data-mdb-input-init class="form-outline mb-3">
                <input type="phone no" id="form3Example4" class="form-control form-control-lg"
                  placeholder="Enter your 10-digit Phone Number" />
                <label class="form-label" for="form3Example4">Phone No.</label>
              </div>
            <div class="text-center text-lg-start mt-4 pt-2">
              <v-btn color="teal" @click="signup">Signup </v-btn>
              <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                  class="link-danger"@click="$router.push('/login')">Login</a></p>
            </div>
            
          </v-form>
        </div>
      </div>
    </div>
   
      <!-- Right -->
   
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import { onMounted } from 'vue';
 
onMounted(()=>{
    let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://kit.fontawesome.com/e021600557.js')
      document.head.appendChild(recaptchaScript)
});


const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const form = ref(null);

const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('');

const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  passwordMatch: () => password.value === confirmPassword.value || 'Passwords must match'
};

const signup = async () => {
  const { valid } = await form.value.validate();
  console.log(email.value,password.value,name.value);
  if (valid) {
    try {
      await authStore.signup(email.value, password.value, name.value);
      snackbarText.value = 'Signup successful!';
      snackbarColor.value = 'success';
      snackbar.value = true;
      router.push('/login');
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