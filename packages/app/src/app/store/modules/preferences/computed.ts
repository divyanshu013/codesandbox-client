import { KEYBINDINGS } from 'common/utils/keybindings';
import { State } from './types';

export function keybindings(state: State) {
    const userBindings = state.settings.keybindings;
    const userBindingsMap = userBindings.reduce(
        (bindings, binding) =>
            Object.assign(bindings, {
                [binding.key]: binding.bindings
            }),
        {}
    );

    return Object.keys(KEYBINDINGS).reduce(
        (currentBindings, key) =>
            Object.assign(currentBindings, {
                [key]: Object.assign(
                    {},
                    KEYBINDINGS[key],
                    key in userBindingsMap ? { bindings: userBindingsMap[key] } : {}
                )
            }),
        {}
    );
}