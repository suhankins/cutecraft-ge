import {
    CartActionContext,
    CartContentsContext,
} from '@/components/Cart/CartProvider';
import { simplifyCartItem } from '@/lib/Cart';
import { useRouter } from 'next/navigation';
import {
    Dispatch,
    SetStateAction,
    FormEventHandler,
    FormEvent,
    useContext,
    useMemo,
} from 'react';
import { useState } from 'react';

export function useSendForm(
    setError: Dispatch<SetStateAction<string | null>>,
    errors: {
        [id: string]: string;
    }
): [FormEventHandler<HTMLFormElement>, boolean] {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { clearCart } = useContext(CartActionContext);
    const cart = useContext(CartContentsContext);
    const simpleCart = useMemo(
        () => cart.map((item) => simplifyCartItem(item)),
        [cart]
    );

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        if (!formData.get('g-recaptcha-response')) {
            setError(errors.recaptcha);
            return;
        }
        formData.append('cart', JSON.stringify(simpleCart));
        setLoading(true);
        try {
            const result = await fetch('/order', {
                method: 'post',
                body: formData,
                redirect: 'follow',
            });
            if (result.ok) {
                const orderId = await result.text();
                clearCart();
                router.push(`/checkout/success?orderId=${orderId}`);
            } else {
                const text = await result.text();
                if (text in errors) setError(errors[text]);
                else setError(text);
            }
        } catch (e) {
            setError(errors.somethingWentWrong);
        }
        setLoading(false);
    };

    return [onSubmit, loading];
}
