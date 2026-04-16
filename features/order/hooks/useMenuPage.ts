"use client";

import { useState } from "react";
import { MenuLogic } from "./MenuLogic";
import { useProfile } from "@/features/profiles/hooks/ProfileLogic";

export function useMenuPage() {
    const { values } = useProfile();
    const storeId = values.storeInfo?.id ?? "";
    const menu = MenuLogic(storeId);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    const filteredCategories = menu.values.categories.map(cat => ({
        ...cat,
        items: (cat.items ?? []).filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }));

    const tabs = ["All", ...menu.values.categories.map(c => c.name)];

    const visibleCategories = activeTab === "All"
        ? filteredCategories
        : filteredCategories.filter(c => c.name === activeTab);

    return {
        data: { storeId, isModalOpen, isCategoryModalOpen, searchQuery, activeTab, tabs },
        Menufunctions: { setSearchQuery, setActiveTab, setModalOpen, setCategoryModalOpen },
        categories: visibleCategories,
        ...menu
    };
}