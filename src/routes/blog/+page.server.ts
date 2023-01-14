import { fail } from "@sveltejs/kit";
import postcss from "postcss";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    const {error,data} = await locals.sb.from('Posts').select().order('created_at', {ascending: false});

    if (data) {
        data.forEach(post => {
           post.created_at = new Date(post.created_at); 
        });
    }
    
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

        if (!title || !body) return fail(400, {message: 'Please fill in the missing fields' });
        
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