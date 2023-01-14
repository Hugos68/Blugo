import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    const {error,data} = await locals.sb.from('Posts').select();
    return {
        posts: data
    }
};

export const actions: Actions = {
    postBlog: async ({locals, request}) => {
        const formData = await request.formData();

        const title = formData.get('title');
        const body = formData.get('body');
        const author = locals.session?.user.id;

        const {error} = await locals.sb.from('Posts').insert({
            title: title,
            body: body,
            author: author
        });

        if (error) {
            return fail(400, {message: error.message});
        }
        
        return {
            success: true
        }
    }
};