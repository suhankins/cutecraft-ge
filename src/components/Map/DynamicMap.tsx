import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./CutecraftMap'), {
    loading: () => <div className="skeleton h-full w-full" />,
    ssr: false,
});

export default DynamicMap;
