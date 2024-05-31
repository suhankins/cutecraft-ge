import { MainBodyWidthContainer } from './MainBodyWidthContainer';

export function Navbar({ children }: { children?: React.ReactNode }) {
    return (
        <nav className="navbar sticky left-0 top-0 z-40 bg-base-300/100 text-neutral">
            <MainBodyWidthContainer>
                <div className="navbar min-h-0 p-0">{children}</div>
            </MainBodyWidthContainer>
        </nav>
    );
}
