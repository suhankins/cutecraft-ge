export function Navbar({ children }: { children?: React.ReactNode }) {
    return (
        <nav className="navbar sticky top-0 left-0 bg-base-300/100 text-neutral">
            {children}
        </nav>
    );
}
