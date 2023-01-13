import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    login: async ({request, locals}) => {
        const formData = await request.formData();

        console.log(formData);
        

        const email =  formData.get('email');
        const password = formData.get('password');

        if (!email || !password) return fail(400, {message: 'Please fill in the missing fields' });

        const {data, error} = await locals.sb.auth.signInWithPassword(email, password);

        console.log(data, error);
        

        if (error) return fail(400, {message: 'Something went wrong...'});
        
        return redirect(303, '/home')
    }
};