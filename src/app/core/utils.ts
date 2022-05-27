export function debounce(delay: number = 300): MethodDecorator {

    let interval: any | undefined;
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any) {
            clearTimeout(interval);

            interval = setTimeout(() => {
                interval = undefined;
                original.apply(this, args);
            }, delay);
        };

        return interval;
    };
}