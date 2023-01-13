<script lang="ts">
	import { enhance } from "$app/forms";

    const submitLogin = () => {

    }
</script>

<main class="flex flex-col items-center">
    <h1 class="py-16">Login to Blugo</h1>
    <form class="flex flex-col items-center gap-12 w-full max-w-[72vw]" action="?/login" method="post" use:enhance={submitLogin}>
        <input class="px-2 py-1 focus:[outline:none] w-[max(20rem,75vw)]" type="text" name="email">
        <input class="px-2 py-1 focus:[outline:none]" type="password" name="password">
        <button type="submit">Login</button>
    </form>
</main>