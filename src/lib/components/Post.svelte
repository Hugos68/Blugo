<script lang="ts">
     export let post: Post;
</script>

<main class="flex flex-col p-8 rounded-lg bg-surface-200-700-token w-[clamp(16rem,50vw,40rem)]">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    <div class="mt-4 flex justify-between items-end">
        <p>Written by: {"Author"}</p>
        <div class="flex gap-2">
            <p>Up: {"10"}</p>
            <p>Down: {"2"}</p>
        </div>
    </div>
</main>