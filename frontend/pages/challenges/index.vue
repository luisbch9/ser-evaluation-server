<template lang="pug">
div
  h1.title.is-2 Challenges
  p Currently we're supporting the following datasets:

  .content
    ul(v-for='(challenge, index) in challenges')
      li 
        Nuxt-link(:to='"/challenges/" + challenge._id')
          p {{ challenge.name }}
</template>

<script>
import axios from '~/plugins/axios'
export default {
  async fetch() {
    try {
      const challengesRes = await axios.get('/challenges')
      this.challenges = challengesRes.data
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      challenges: [],
    }
  },
}
</script>
