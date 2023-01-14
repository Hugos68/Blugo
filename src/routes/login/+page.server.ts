import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    login: async ({request, locals}) => {
        
        const formData = await request.formData();

        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) return fail(400, {message: 'Please fill in the missing fields' });

        const {data, error: err} = await locals.sb.auth.signInWithPassword({
            email: email as string,
            password: password as string
        });

        if (err) {
            return fail(400, {message: err.message});
        }
        
        throw redirect(303, '/home')
    }
}