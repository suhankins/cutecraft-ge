import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { UserModel } from '@/models/User';
import { hash } from 'bcrypt';

export async function POST(request: NextRequest) {
    const newPassword = (await request.json().catch(() => ({}))).password;
    if (!newPassword) return new NextResponse(null, { status: 400 });

    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse(null, { status: 401 });

    const user = await UserModel.findOne({ name: session.user?.name });
    if (!user) return new NextResponse(null, { status: 401 });

    user.passwordHash = await hash(newPassword, 10);
    await user.save();

    return new NextResponse(null, { status: 200 });
}
