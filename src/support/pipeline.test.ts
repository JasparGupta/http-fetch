import pipeline from './pipeline';

describe('pipeline', () => {
    test('runs through pipeline and returns final result', () => {
        const pipes = [
            jest.fn((passable, next) => next(passable)),
            jest.fn((passable, next) => next(passable)),
            jest.fn((passable, next) => next(passable)),
        ];

        expect(pipeline(pipes)('Foo')).toBe('Foo');

        const [pipe1, pipe2, pipe3] = pipes;

        expect(pipe1).toHaveBeenCalled();
        expect(pipe2).toHaveBeenCalled();
        expect(pipe3).toHaveBeenCalled();
    });

    test('runs through pipeline and calls destination function with result', () => {
        const pipes = [
            jest.fn((passable, next) => next(passable)),
            jest.fn((passable, next) => next(passable)),
            jest.fn((passable, next) => next(passable)),
        ];

        const stack = pipeline(pipes, passable => `${passable} bar`);

        expect(stack('Foo')).toBe('Foo bar');

        const [pipe1, pipe2, pipe3] = pipes;

        expect(pipe1).toHaveBeenCalled();
        expect(pipe2).toHaveBeenCalled();
        expect(pipe3).toHaveBeenCalled();
    });

    test('runs through pipeline and exits where `next` is not called', () => {
        const pipes = [
            jest.fn((passable, next) => next(passable)),
            jest.fn((passable, next) => 'Baz'),
            jest.fn((passable, next) => next(passable)),
        ];

        expect(pipeline(pipes)('Foo')).toBe('Baz');

        const [pipe1, pipe2, pipe3] = pipes;

        expect(pipe1).toHaveBeenCalled();
        expect(pipe2).toHaveBeenCalled();
        expect(pipe3).not.toHaveBeenCalled();
    });
});
