export function Breadcrumbs({ items }: { items: React.ReactNode[] }) {
    return (
        <div className="breadcrumbs">
            <ul>
                <li></li>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
