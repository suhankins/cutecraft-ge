import {
    isOnComeBackLater,
    comeBackLaterMiddleware,
} from './comeBackLaterMiddleware';

describe('comeBackLaterMiddleware', () => {
    describe('checkIfAlreadyOnComeBackLater', () => {
        const testCases = [
            [true, '/comebacklater'],
            [true, '/en/comebacklater'],
            [false, '/'],
            [false, '/en'],
            [false, '/en/comebacklater/comebacklater'],
            [false, '/anything/else'],
        ];

        test.each(testCases)(
            'should return %s for %s',
            (expected, pathname) => {
                expect(isOnComeBackLater(pathname as string)).toBe(expected);
            }
        );
    });

    describe('comeBackLaterMiddleware', () => {
        const url = 'https://example.com';

        describe('when COME_BACK_LATER is set to true', () => {
            beforeEach(() => {
                vi.stubEnv('COME_BACK_LATER', 'true');
            });

            const testCases = [
                ['/', true],
                ['/en', true],
                ['/comebacklater', false],
                ['/en/comebacklater', false],
                ['/en/comebacklater/comebacklater', true],
                ['/anything/else', true],
            ];

            test.each(testCases)(
                'should redirect from %s: %s',
                async (pathname, redirectExpected) => {
                    const result = await comeBackLaterMiddleware({
                        url,
                        nextUrl: { pathname },
                    } as any);

                    if (redirectExpected) {
                        expect(result?.status).toEqual(307);
                        expect(result?.headers.get('location')).toBe(
                            url + '/comebacklater'
                        );
                    } else {
                        expect(result).toBeNull();
                    }
                }
            );
        });

        describe('when COME_BACK_LATER is not set', () => {
            beforeEach(() => {
                vi.stubEnv('COME_BACK_LATER', 'false');
            });

            const testCases = [
                ['/', false],
                ['/en', false],
                ['/comebacklater', true],
                ['/en/comebacklater', true],
                ['/en/comebacklater/comebacklater', false],
                ['/anything/else', false],
                ['/very/really/long/anything/else', false],
            ];

            test.each(testCases)(
                'should redirect from %s: %s',
                async (pathname, redirectExpected) => {
                    const result = await comeBackLaterMiddleware({
                        url,
                        nextUrl: { pathname },
                    } as any);

                    if (redirectExpected) {
                        expect(result?.status).toEqual(307);
                        expect(result?.headers.get('location')).toBe(url + '/');
                    } else {
                        expect(result).toBeNull();
                    }
                }
            );
        });
    });
});
