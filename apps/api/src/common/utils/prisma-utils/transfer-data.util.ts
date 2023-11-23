// Exclude keys from user
export function exclude<Modal, Key extends keyof Modal>(
    modals: Modal,
    keys: Key[]
): Omit<Modal, Key> {
    return Object.fromEntries(
        Object.entries(modals).filter(([key]) => !keys.includes(key as Key))
    ) as Omit<Modal, Key>
}