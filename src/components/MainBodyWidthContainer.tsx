export function MainBodyWidthContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto flex max-w-screen-lg flex-col gap-3 px-4">
            {children}
        </div>
    );
}
