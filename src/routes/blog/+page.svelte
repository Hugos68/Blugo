<script lang="ts">
    let title: string = "";
    let description: string = "";
    $: startedBlog = (title || description);

    // TODO: Only show description once title gets typed in (smooth transition in height for e.g)
</script>
