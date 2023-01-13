
<script lang="ts">
	import { enhance } from "$app/forms";

    const submitRegister = () => {

    }
</script>

<main class="flex flex-col items-center">
    <h1 class="py-16">Register</h1>
    <form class="flex flex-col items-center gap-12 w-full" action="?/login" method="post" use:enhance={submitRegister}>
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Email" type="text" name="email">
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Password"type="password" name="password">
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Confirm password" type="password" name="confirmPassword">
        <button class="btn btn-surface-500-400-token" type="submit">Register</button>
    </form>
</main>