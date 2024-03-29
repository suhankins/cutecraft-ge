export async function newItem(categoryId: string) {
    const result = await fetch(`/api/category/${categoryId}/items/`, {
        method: 'POST',
        body: JSON.stringify({
            name: { en: `New Item ${Math.round(Math.random() * 10000)}` },
        }),
    });
    if (result.ok) console.log('New item added successfully');
    else throw new Error('Failed to add new item.');
}
