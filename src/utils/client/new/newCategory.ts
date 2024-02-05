export async function newCategory() {
    const result = await fetch(`/api/category/`, {
        method: 'POST',
        body: JSON.stringify({
            name: { en: `New Category ${Math.round(Math.random() * 10000)}` },
        }),
    });
    if (result.ok) console.log('New category added successfully');
    else throw new Error('Failed to add new category.');
}
