<template>
<v-container class="fill-height "  fluid>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" color="" dark>
                <v-card-title class="text-center">Login</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="">
                        <v-text-field
                            label="Email"
                            type="email"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            type="password"
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn type="submit" id="Login" class="mx-auto" >Login</v-btn>
                    <v-btn  class="bg-teal mx-auto" >Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>