import { MutableRefObject, useEffect, useRef } from 'react';

const useInterval = (callback: VoidFunction, interval: number | null) => {
    // Why interval methods are using NodeJS.Timeout interface
    // read more here https://github.com/DefinitelyTyped/DefinitelyTyped/pull/61109
    // actual PR that changes the type in @types/node: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/66176
    const intervalIdRef: MutableRefObject<NodeJS.Timeout | undefined> = useRef();
    const callbackRef: MutableRefObject<VoidFunction> = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        if (!interval) {
            return () => {};
        }

        const intervalId: NodeJS.Timeout = setInterval(() => callbackRef.current(), interval);
        intervalIdRef.current = intervalId;

        return () => clearInterval(intervalId);
    }, [interval]);

    return () => clearInterval(intervalIdRef.current);
};

export { useInterval };
