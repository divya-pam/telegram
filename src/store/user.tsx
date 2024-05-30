import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const globalStore = create(
  persist(
    (set, get) => ({
      user: null,
      allConversations: [],
      allUsers: [],
      activeConversation: "",
      activeConversationData: [],

      setUser: (user: any) => set(() => ({ user })),
      setAllConversations: (allConversations: any) =>
        set(() => ({ allConversations })),
      setAllUsers: (allUsers: any) => set(() => ({ allUsers })),
      setActiveConversation: (activeConversation: any) =>
        set(() => ({ activeConversation })),
      setActiveConversationData: (activeConversationData: any) =>
        set(() => ({ activeConversationData })),

      logoutUser: () =>
        set({
          user: null,
          allConversations: [],
          allUsers: [],
          activeConversation: "",
          activeConversationData: [],
        }),
    }),
    {
      name: "global-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
