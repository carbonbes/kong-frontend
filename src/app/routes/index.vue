<script setup lang="ts">
definePageMeta({
  name: 'IndexPage',
  redirect: { name: 'FeedPage', params: { order: 'fresh' }, replace: true },
})
</script>
