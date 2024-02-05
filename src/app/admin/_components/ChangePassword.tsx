'use client';

import { FormEvent, useCallback, useState } from 'react';

export function ChangePassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
            await fetch('/api/user/password', {
                method: 'POST',
                body: JSON.stringify({
                    password,
                }),
            });
            setLoading(false);
        },
        [password, setLoading]
    );

    return (
        <form className="flex items-end gap-2" onSubmit={onSubmit}>
            <label className="form-control">
                <span className="label-text">New password</span>
                <input
                    disabled={loading}
                    className="input-bordered input"
                    type="password"
                    placeholder="*******"
                    value={password}
                    onChange={(change) => setPassword(change.target.value)}
                />
            </label>
            <button type="submit" className="btn" disabled={loading}>
                Change
            </button>
        </form>
    );
}
