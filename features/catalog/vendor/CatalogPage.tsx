"use client";

import { Search, Plus, Edit, ToggleLeft, ToggleRight, Trash2, FolderPlus, Pencil } from "lucide-react";
import { useCatalogPage } from "../hooks/useCatalogPage";
import ProductFormModal from "../components/AddProductModal";
import AddCategoryModal from "../components/AddCategoryModal";

export default function CatalogPage() {

    
    const {
        data: { storeId, isModalOpen, isCategoryModalOpen, searchQuery, activeTab, tabs, editFields, editingItemId},
        Menufunctions: { setSearchQuery, setActiveTab, setModalOpen, setCategoryModalOpen, setEditingItemId, setEditFields, handleSaveEdit, handleStartEdit },
        categories: visibleCategories,
        ...menu
    } = useCatalogPage();

    return (
        <div className="size-full flex flex-col">
            <div className="flex-1 bg-gray-50 overflow-auto">
                <div className="p-8">
                    {/* Feedback */}
                    {menu.values.error && <p className="text-red-500 text-sm mb-4">{menu.values.error}</p>}
                    {menu.values.success && <p className="text-green-500 text-sm mb-4">✓ {menu.values.success}</p>}

                    <div className="mb-6 flex items-center gap-3">
                        <button
                            onClick={() => setCategoryModalOpen(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                        >
                            <FolderPlus size={16} />
                            Add Category
                        </button>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                        >
                            <Plus size={16} />
                            Add New Product
                        </button>
                    </div>

                    {/* Search and Tabs */}
                    <div className="bg-white rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1 max-w-md">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search in menu"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex gap-8 overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${
                                            tab === activeTab
                                                ? "text-gray-900"
                                                : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        {tab}
                                        {tab === activeTab && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {menu.values.isLoading && <p className="text-gray-400 text-sm text-center py-8">Loading menu...</p>}

                        {!menu.values.isLoading && visibleCategories.length === 0 && (
                            <p className="text-gray-400 text-sm text-center py-8">No items found</p>
                        )}

                        {visibleCategories.map((category) => (
                            <div key={category.id} className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {(category.items ?? []).map((item) => (
                                        <div
                                            key={item.id}
                                            className={`border rounded-xl p-4 flex gap-3 ${
                                                item.is_available ? "border-gray-200" : "border-gray-100 opacity-60"
                                            }`}
                                        >
                                            {item.id === editingItemId ? (
                                                <div className="flex gap-3 w-full">
                                                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                        {editFields.image
                                                            ? <img src={editFields.image} alt="" className="w-full h-full object-cover" />
                                                            : <span className="text-gray-300 text-2xl font-bold">{editFields.name.charAt(0)}</span>
                                                        }
                                                    </div>
                                                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                                                        <input
                                                            value={editFields.name}
                                                            onChange={(e) => setEditFields(f => ({ ...f, name: e.target.value }))}
                                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            placeholder="Name"
                                                        />
                                                        <input
                                                            value={editFields.description}
                                                            onChange={(e) => setEditFields(f => ({ ...f, description: e.target.value }))}
                                                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            placeholder="Description (optional)"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={editFields.price}
                                                            onChange={(e) => setEditFields(f => ({ ...f, price: e.target.value }))}
                                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            placeholder="Price"
                                                            min="0"
                                                            step="0.01"
                                                        />
                                                        <input
                                                            value={editFields.image}
                                                            onChange={(e) => setEditFields(f => ({ ...f, image: e.target.value }))}
                                                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            placeholder="Image URL (optional)"
                                                        />
                                                        <div className="flex gap-2 mt-1">
                                                            <button
                                                                onClick={() => handleSaveEdit(category.id, item.id)}
                                                                disabled={menu.values.isLoading}
                                                                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded text-xs font-medium"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingItemId(null)}
                                                                className="px-3 py-1 border border-gray-300 hover:bg-gray-50 text-gray-600 rounded text-xs"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <span className="text-gray-300 text-2xl font-bold">
                                                                {item.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                                        {item.description && (
                                                            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{item.description}</p>
                                                        )}
                                                        <p className="text-orange-500 font-semibold mt-1">₱{item.price.toFixed(2)}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <button
                                                                onClick={() => handleStartEdit(item)}
                                                                className="text-gray-400 hover:text-blue-500 transition-colors"
                                                            >
                                                                <Pencil size={15} />
                                                            </button>
                                                            <button
                                                                onClick={() => menu.functions.handleToggleAvailability(category.id, item.id, !item.is_available)}
                                                                className="text-gray-400 hover:text-orange-500 transition-colors"
                                                                title={item.is_available ? "Mark unavailable" : "Mark available"}
                                                            >
                                                                {item.is_available
                                                                    ? <ToggleRight size={18} className="text-orange-500" />
                                                                    : <ToggleLeft size={18} />
                                                                }
                                                            </button>
                                                            <button
                                                                onClick={() => menu.functions.handleDeleteItem(category.id, item.id)}
                                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ProductFormModal
                open={isModalOpen}
                onOpenChange={setModalOpen}
                categories={menu.values.categories}
                onSubmit={menu.functions.handleAddItem}
                isLoading={menu.values.isLoading}
            />

            <AddCategoryModal
                open={isCategoryModalOpen}
                onOpenChange={setCategoryModalOpen}
                onSubmit={menu.functions.handleAddCategory}
                isLoading={menu.values.isLoading}
            />
        </div>
    );
}
