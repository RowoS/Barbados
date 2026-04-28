
"use client";

import { Clock, MapPinned, ChevronDown, ListFilter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { OrderMap } from './OrderMapComponent';
import { useCustomerOrders } from '../hooks/useCustomerOrders';
import { statusBadgeClass, statusDotClass} from '../libs/order_Status';
import { CustomerOrder } from '../types/types';

export function CustomerOrdersSection() {
  const { values, functions } = useCustomerOrders();
  const { visibleOrders, counts, isLoading, error, activeTab, cancellingId, cancelReason } = values;
  const { setActiveTab, cancelOrder, confirmReceived, setCancellingId, setCancelReason, statusLabel } = functions;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mapOverlay, setMapOverlay] = useState<{ lat: number; lng: number; address: string } | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!(e.target as Element).closest('.menu-btn-wrap')) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  


  const canCancel = (status: string) => ['pending', 'stand_by'].includes(status);

  function openMap(order: CustomerOrder) {
    if (!order.latitude || !order.longitude) return;
    setMapOverlay({
      lat: order.latitude,
      lng: order.longitude,
      address: order.address ?? `${order.store_name}`,
    });
  }

  return (
    <div className="min-h-screen p-6" style={{ background: '#FAF7F4', fontFamily: "'DM Sans', sans-serif" }}>

      <div className="flex items-center gap-2.5 mb-6 flex-wrap">
        {([
          { key: 'all',        label: 'All Orders',   count: counts.all },
          { key: 'to_receive', label: 'To Receive',   count: counts.to_receive },
          { key: 'history',    label: 'Order History', count: null },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-transparent border-stone-300 text-stone-500 hover:bg-stone-100'
            }`}
          >
            {tab.key === 'all' && <Clock size={13} />}
            {tab.label}
            {tab.count != null && tab.count > 0 && (
              <span className="ml-0.5 bg-white text-orange-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        ))}

        <button className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 bg-white text-sm font-medium text-stone-500 hover:bg-stone-50">
          <ListFilter size={13} />
          Sort
          <ChevronDown size={12} />
        </button>
      </div>

      {isLoading && <p className="text-stone-400 text-sm text-center py-12">Loading orders...</p>}
      {error    && <p className="text-red-400 text-sm text-center py-12">{error}</p>}

      {!isLoading && visibleOrders.length === 0 && (
        <p className="text-stone-400 text-sm text-center py-12">No orders here yet.</p>
      )}

      <div className="space-y-4">
        {!isLoading && visibleOrders.map((order) => (
          <div key={order.order_id} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">


            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-500 font-bold text-base">
                    {order.store_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800 mb-0.5">{order.store_name}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-stone-400">Order #{order.order_id.slice(0, 8)}</span>
    
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {(activeTab === 'all' || activeTab === 'to_receive') && (
                <div className="relative menu-btn-wrap">

                {cancellingId === order.order_id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Reason (optional)"
                      className="px-3 py-1.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-400 w-44"
                      autoFocus
                    />
                    <button
                      onClick={() => cancelOrder(order.order_id)}
                      className="px-3 py-1.5 bg-red-500 border border-stone-300 text-black rounded-lg text-xs font-semibold hover:bg-red-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => { setCancellingId(null); setCancelReason(''); }}
                      className="px-3 py-1.5 border border-stone-300 text-stone-500 rounded-lg text-xs hover:bg-stone-50"
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenMenu(openMenu === order.order_id ? null : order.order_id)}
                      className="border border-stone-200 rounded-lg w-10 h-10 flex flex-col items-center justify-center gap-1 hover:bg-stone-50 transition-colors"
                    >
                      <span className="w-1 h-1 bg-stone-500 rounded-full" />
                        ≣
                      <span className="w-1 h-1 bg-stone-500 rounded-full" />
                    </button>

                    {openMenu === order.order_id && (
                      <div className="absolute right-0 top-11 bg-white border border-stone-200 rounded-xl shadow-lg z-10 min-w-[180px] overflow-hidden">

                        {activeTab === 'to_receive' && (
                          <button
                            onClick={() => { confirmReceived(order.order_id); setOpenMenu(null); }}
                            className="block w-full text-left px-4 py-2.5 text-sm font-medium text-green-600 hover:bg-stone-50 transition-colors"
                          >
                            ✓ Order Received
                          </button>
                        )}

                        {activeTab === 'all' && canCancel(order.status) && (
                          <button
                            onClick={() => { setCancellingId(order.order_id); setOpenMenu(null); }}
                            className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-stone-50 transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}

                        {activeTab === 'all' && !canCancel(order.status) && (
                          <div className="px-4 py-2.5 text-xs text-stone-400">
                            Order is being prepared and can no longer be cancelled.
                          </div>
                        )}
                      </div>
                    )}
                  </>
              )}
            </div>
            )}
            </div>

            <div className="flex flex-col divide-y divide-stone-100">
              {order.items.map((item) => (
                <div key={item.order_item_id} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-semibold text-orange-500 min-w-[28px]">x{item.quantity}</span>
                  <span className="text-sm text-stone-700 flex-1 mx-2">{item.name}</span>
                  <span className="text-sm font-semibold text-stone-800">₱{item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {order.notes && (
              <p className="mt-3 text-xs text-stone-500 bg-stone-50 rounded-lg px-3 py-2">
                Note: {order.notes}
              </p>
            )}


            {order.fulfillment === 'delivery' && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-stone-400">
                <MapPinned size={12} className="flex-shrink-0" />
                {order.delivery_landmark}, {order.delivery_barangay}, {order.delivery_city}
              </p>
            )}

            {order.fulfillment === 'pickup' && order.latitude && order.longitude && (
              <button
                onClick={() => openMap(order)}
                className="mt-2 flex items-center gap-1.5 text-xs text-blue-500 underline hover:text-orange-400 transition-colors text-left"
              >
                <MapPinned size={12} className="flex-shrink-0" />
                {order.address ?? order.store_name}
              </button>
            )}

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order.fulfillment === 'delivery'
                    ? 'bg-blue-50 text-blue-500'
                    : 'bg-green-50 text-green-600'
                }`}>
                  {order.fulfillment === 'delivery' ? 'Delivery' : 'Pick-up'}
                </span>

                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusBadgeClass(order.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass(order.status)}`} />
                      {statusLabel(order.status)}
                </span>

                {activeTab === 'history' && order.cancel_reason && (
                  <span className="text-xs text-stone-400 italic">
                    Reason: {order.cancel_reason}
                  </span>
                )}

                
              </div>

              <span className="text-sm font-bold text-stone-800">
                Total: ₱{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {mapOverlay && (
        <OrderMap
          isOpen={!!mapOverlay}
          onClose={() => setMapOverlay(null)}
          lat={mapOverlay.lat}
          lng={mapOverlay.lng}
          address={mapOverlay.address}
        />
      )}
    </div>
  );
}