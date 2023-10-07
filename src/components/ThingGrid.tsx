export function ThingGrid({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex w-full flex-wrap items-center justify-center gap-4">
            {children}
        </section>
    );
}
