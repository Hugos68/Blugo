
<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

    const submitRegister: SubmitFunction = () => {
        return async ({ result }) => {        
            await applyAction(result);
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: 'Success! Check your email',
                    // Optional: Presets for primary | secondary | tertiary | warning
                    preset: 'success',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 3500,
                };
                toastStore.trigger(t);
            }
            else if (result.type==='failure') {      
                const t: ToastSettings = {
                    message: result.data?.message,
                    // Optional: Presets for primary | secondary | tertiary | warning
                    preset: 'error',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 3500,
                };
                toastStore.trigger(t);
            }
        }
    }
</script>

<main class="flex flex-col items-center">
    <h1 class="py-16">Register</h1>
    <form class="flex flex-col items-center gap-12 w-full" action="?/register" method="post" use:enhance={submitRegister}>
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Email" type="text" name="email">
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Password"type="password" name="password">
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Confirm password" type="password" name="confirmPassword">
        <button class="btn bg-tertiary-400-500-token" type="submit">Register</button>
    </form>
</main>