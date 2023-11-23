export function MainBodyWidthContainer({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`mx-auto flex w-full max-w-screen-lg flex-col gap-3 px-4 ${className}`}
        >
            {children}
        </div>
    );
}
