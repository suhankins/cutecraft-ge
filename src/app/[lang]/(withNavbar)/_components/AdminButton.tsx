import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserIcon } from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export async function AdminButton() {
    const session = await getServerSession(authOptions);
    if (session) {
        return (
            <Link
                href="/admin"
                className="btn-ghost btn-square btn relative mr-3"
            >
                <UserIcon className="h-8 w-6" />
            </Link>
        );
    } else {
        return null;
    }
}
