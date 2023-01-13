import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    register: async ({request, locals}) => {
        const formData = await request.formData();

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!email || !password || !confirmPassword) return fail(400, {message: 'Please fill in the missing fields' });
        else if (password!==confirmPassword) return fail(400, { message: 'Password Mismatch'})
        
        const {data, error: err} = await locals.sb.auth.signUp({
            email: email as string,
            password: password as string
        });

        if (err) {
            return fail(400, {message: err.message});
        }

        return redirect(303, '/login')
    }
}