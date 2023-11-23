import { MainBodyWidthContainer } from '../MainBodyWidthContainer';

export function Navbar({ children }: { children?: React.ReactNode }) {
    return (
        <nav className="navbar sticky top-0 left-0 z-40 bg-base-300/100 text-neutral">
            <MainBodyWidthContainer className="w-full">
                <div className="navbar min-h-0 p-0">{children}</div>
            </MainBodyWidthContainer>
        </nav>
    );
}
