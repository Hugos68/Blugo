<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import { toastStore } from "@skeletonlabs/skeleton/utilities/Toast/stores";
	import type { ToastSettings } from "@skeletonlabs/skeleton/utilities/Toast/types";
	import type { ActionResult } from "@sveltejs/kit";

    const submitLogin = () => {
        return async (result: ActionResult) => {        
            await applyAction(result);
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: 'Success! Logging you in...',
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
    <h1 class="py-16">Login</h1>
    <form class="flex flex-col items-center gap-12 w-full" action="?/login" method="post" use:enhance={submitLogin}>
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Email" type="text" name="email">
        <input class="px-5 py-2 focus:[outline:none] max-w-[min(30rem,90vw)]" placeholder="Password" type="password" name="password">
        <button type="submit">Login</button>
    </form>
</main>