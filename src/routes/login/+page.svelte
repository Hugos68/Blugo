<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { toastStore } from "@skeletonlabs/skeleton/utilities/Toast/stores";
	import type { ToastSettings } from "@skeletonlabs/skeleton/utilities/Toast/types";

    const submitLogin: SubmitFunction = () => {
        return async ({result}) => {        
            await applyAction(result);
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: 'Succesfully logged in!',
                    preset: 'success',
                    autohide: true,
                    timeout: 3500,
                };
                toastStore.trigger(t);
            }
            else if (result.type==='failure') {      
                const t: ToastSettings = {
                    message: result.data?.message,
                    preset: 'error',
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
        <button class="btn bg-primary-400-500-token" type="submit">Login</button>
    </form>
</main>