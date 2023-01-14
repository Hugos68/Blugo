<script lang="ts">
     export let post: Post;
    $: formattedDate = (() => {
        const day = post.created_at.getDay();
        const month = post.created_at.getMonth() + 1; // Required to deal with 0 based indexing of months
        const year = post.created_at.getFullYear();
        return `${day}/${month}/${year}`
     })();
</script>

<main class="flex flex-col p-8 rounded-lg bg-surface-200-700-token w-[clamp(16rem,50vw,40rem)]">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    <div class="mt-4 flex justify-between items-end">
        <div class="flex flex-col">
            <p>Written by: {"Author"}</p>
            <p>{formattedDate}</p>
        </div>
        <div class="flex gap-2">
            <p>Up: {"10"}</p>
            <p>Down: {"2"}</p>
        </div>
    </div>
</main>