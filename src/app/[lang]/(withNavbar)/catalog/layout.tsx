import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';

export default function CatalogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MainBodyWidthContainer className="my-4">
            {children}
        </MainBodyWidthContainer>
    );
}
