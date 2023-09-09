'use server'

import { revalidateTag } from 'next/cache'

interface FormInput {
    name: string,
    title: string,
    allSelected: string[],
    formData: FormData
}
export async function save(props: FormInput) {
    const { name, title, allSelected, formData } = props;

    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
        data[key] = value as string;
    });

    const url = data["url"];
    const categories = [...allSelected, data["categories"]].filter(
        (item) => item !== ""
    );


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: name, title, url, categories
        }),
    }
    try {

        const request = await fetch(`${process.env.URL}/api/${name}/save`, requestOptions);
        const reqResponse = await request.json();
        console.log("reqres", reqResponse)

        revalidateTag('all_links')
        return { status: "success", message: "Link Saved!" }
    } catch (err) {
        console.error("Error saving link:", err)
        return { status: "error", message: "An error occured while saving link. Try again" }
    }
}

export async function revalidateAll() {
    revalidateTag('all_links');
    revalidateTag("categories")
}