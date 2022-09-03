<template>
  <div class="vk-auth">

  </div>
</template>

<script>
  export default{
    async created(){
      let accessToken = this.$route.query.access_token;
      let refreshToken = this.$route.query.refresh_token;

      if (accessToken !== undefined && refreshToken !== undefined){
        await this.$store.dispatch('signIn',{"accessToken":accessToken, "refreshToken": refreshToken})
        this.$router.push('/catalog');
      }

      else
        this.$router.push('/sign')
    }
  }
</script>
