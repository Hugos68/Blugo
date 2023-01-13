<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { toastStore } from "@skeletonlabs/skeleton/utilities/Toast/stores";
	import type { ToastSettings } from "@skeletonlabs/skeleton/utilities/Toast/types";
	import type { ActionResult } from "@sveltejs/kit";

    const submitLogin = () => {
        return async (result: ActionResult) => {
            await applyAction(result);
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: '👋 Hello and welcome to Skeleton.',
                    // Optional: Presets for primary | secondary | tertiary | warning
                    preset: 'success',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 5000,
                    // Optional: Adds a custom action button
                    action: {
                        label: 'Greeting',
                        response: () => alert('Hello, Skeleton')
                    }
                };
                toastStore.trigger(t);
            }
            else if (result.type==='error') {
                const t: ToastSettings = {
                    message: '👋 Hello and welcome to Skeleton.',
                    // Optional: Presets for primary | secondary | tertiary | warning
                    preset: 'success',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 5000,
                    // Optional: Adds a custom action button
                    action: {
                        label: 'Greeting',
                        response: () => alert('Hello, Skeleton')
                    }
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