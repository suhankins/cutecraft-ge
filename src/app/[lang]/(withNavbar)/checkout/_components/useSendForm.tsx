import { CartContentsContext } from '@/components/Cart/CartProvider';
import { simplifyCartItem } from '@/lib/Cart';
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
        recaptcha: string;
        somethingWentWrong: string;
    }
): [FormEventHandler<HTMLFormElement>, boolean] {
    const [loading, setLoading] = useState(false);
    const cart = useContext(CartContentsContext);
    const simpleCart = useMemo(
        () => cart.map((item) => simplifyCartItem(item)),
        [cart]
    );

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        if (!formData.get('g-recaptcha-response')) {
            setError(errors.recaptcha);
            return;
        }
        formData.append('cart', JSON.stringify(simpleCart));
        console.log(formData);
    };

    return [onSubmit, loading];
}
