<script lang="ts">
     export let post: Post;
    $: formattedDate = (() => {
        const day = post.created_at.getDay();
        const month = post.created_at.getMonth() + 1; // Required to deal with 0 based indexing of months
        const year = post.created_at.getFullYear();
        return `${day}/${month}/${year}`
     })();
</script>

<main class="flex flex-col p-8 rounded-lg bg-surface-200-700-token">
    <h2>{post.title}</h2>
    <p class="break-words">{post.body}</p>
    <div class="mt-4 flex justify-between items-end">
        <div class="flex flex-col">
            <p>Written by: {"Author"}</p>
            <p>{formattedDate}</p>
        </div>
        <div class="flex gap-2">
            <div class="bg-success-700 p-1">
                <p>Up: {post.upvotes}</p>
            </div>
            <div class="bg-error-700 p-1">
                <p>Down: {post.downvotes}</p>
            </div>
        </div>
    </div>
</main>