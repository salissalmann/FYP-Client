import { create } from 'zustand'

interface LoginStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useLoginModel = create<LoginStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useLoginModel