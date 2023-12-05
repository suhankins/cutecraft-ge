import { ResponseError } from './ResponseError';

export async function validateCaptcha(recaptchaValue: string) {
    console.log('Validating captcha');
    const captchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaValue}`,
        }
    ).catch((err) => {
        console.error('Error while validating captcha', err);
        throw new ResponseError('Error while validating captcha', 500);
    });

    if (!captchaResponse || !captchaResponse.ok) {
        console.error('Unknown error while validating captcha');
        throw new ResponseError('Error while validating captcha', 500);
    }

    const captchaResponseJson = await captchaResponse.json();
    if (!captchaResponseJson.success) {
        console.error('Captcha validation failed');
        throw new ResponseError('Captcha validation failed', 400);
    }

    console.log('Captcha validation successful');
}
