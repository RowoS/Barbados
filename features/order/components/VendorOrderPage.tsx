import { Clock, ChevronDown, MapPinned, ListFilter, List } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useVendorOrders } from '../hooks/useOrderPage';
import { OrderMap } from './OrderMapComponent';
import { statusBadgeClass, statusDotClass, getStatusOptions } from '../libs/order_Status';

export function VendorsOrdersPage() {
  const { values, functions } = useVendorOrders();
  const { visibleOrders, isLoading, error, activeTab, counts, cancellingId, cancelReason } = values;
  const { setActiveTab, handleConfirm, handleDecline, handleStatusUpdate,
    setCancellingId, setCancelReason, statusLabel } = functions;

  const [mapOverlay, setMapOverlay] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!(e.target as Element).closest('.menu-btn-wrap')) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function openMap(order: typeof visibleOrders[0]) {
    if (!order.latitude || !order.longitude) {
      setMapOverlay({
        lat: 10.6769,
        lng: 124.8006,
        address: "Location not available",
      });
      return;
    }

    const addressStr = `${order.delivery_landmark}, ${order.delivery_barangay}, ${order.delivery_city}`;

    setMapOverlay({
      lat: order.latitude,
      lng: order.longitude,
      address: addressStr,
    });
  }

  return (
    <div className="min-h-screen p-8" style={{ background: '#FAF7F4', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Tab Bar */}
      <div className="flex items-center gap-2.5 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('request')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
            activeTab === 'request'
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'bg-transparent border-stone-300 text-stone-500 hover:bg-stone-100'
          }`}
        >
          <Clock size={13} />
          Order Request
          {counts.request > 0 && (
            <span className="ml-0.5 bg-white text-orange-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {counts.request}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('running')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
            activeTab === 'running'
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'bg-transparent border-stone-300 text-stone-500 hover:bg-stone-100'
          }`}
        >
          Running Orders
          {counts.running > 0 && (
            <span className="ml-0.5 bg-white text-orange-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {counts.running}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'bg-transparent border-stone-300 text-stone-500 hover:bg-stone-100'
          }`}
        >
          Order History
        </button>

        <button className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 bg-white text-sm font-medium text-stone-500 hover:bg-stone-50">
          <ListFilter size={13} />
          Sort
          <ChevronDown size={12} />
        </button>
      </div>

      {isLoading && <p className="text-stone-400 text-sm text-center py-12">Loading orders...</p>}
      {error && <p className="text-red-400 text-sm text-center py-12">{error}</p>}

      <div className="space-y-4">
        {!isLoading && visibleOrders.map((order) => (
          <div key={order.order_id} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800 mb-0.5">
                    {order.customer_name ?? `Customer`}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-stone-400">Order #{order.order_id.slice(0, 8)}</span>
                    {activeTab === 'request' && (
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        order.fulfillment === 'delivery' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {order.fulfillment === 'delivery' ? 'Delivery' : 'Pick-up'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {activeTab === 'running' && (
                <div className="relative menu-btn-wrap">
                  <button
                    onClick={() => setOpenMenu(openMenu === order.order_id ? null : order.order_id)}
                    className="border border-stone-200 rounded-lg w-10 h-10 flex flex-col items-center justify-center gap-1 hover:bg-stone-50 transition-colors"
                  >
                    <span className="w-1 h-1 bg-stone-500 rounded-full" />
                        ≣
                    <span className="w-1 h-1 bg-stone-500 rounded-full" />
                  </button>

                  {openMenu === order.order_id && (
                    <div className="absolute right-0 top-10 bg-white border border-stone-200 rounded-xl shadow-lg z-10 min-w-[190px] overflow-hidden">
                      {getStatusOptions(order.fulfillment).map((opt, i) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            handleStatusUpdate(order.order_id, opt.value as any);
                            setOpenMenu(null);
                          }}
                          className={`block w-full text-left px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors ${
                            i > 0 ? 'border-t border-stone-100' : ''
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'request' && (
                cancellingId === order.order_id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Reason (optional)"
                      className="px-3 py-1.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 w-44"
                    />
                    <button
                      onClick={() => handleDecline(order.order_id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                    >
                      Confirm Decline
                    </button>
                    <button
                      onClick={() => setCancellingId(null)}
                      className="px-4 py-2 border border-stone-300 text-stone-500 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCancellingId(order.order_id)}
                      className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg text-xs font-semibold uppercase tracking-wide hover:bg-orange-50"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleConfirm(order.order_id)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wide hover:bg-orange-600"
                    >
                      Process
                    </button>
                  </div>
                )
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

            {order.fulfillment === 'delivery' && order.delivery_landmark && (
              <button
                onClick={() => openMap(order)}
                className="mt-2 flex items-center gap-1.5 text-xs text-blue-500 underline hover:text-orange-400 transition-colors text-left"
              >
                <MapPinned size={12} className="flex-shrink-0" />
                {order.delivery_landmark}, {order.delivery_barangay}, {order.delivery_city}
              </button>
            )}

            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order.fulfillment === 'delivery'
                    ? 'bg-blue-50 text-blue-500'
                    : 'bg-green-50 text-green-600'
                }`}>
                  Fulfillment: {order.fulfillment === 'delivery' ? 'Delivery' : 'Pick-up'}
                </span>

                {activeTab !== 'request' && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-semibold ${statusBadgeClass(order.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass(order.status)}`} />
                    {statusLabel(order.status)}
                    {order.cancel_reason && ` — ${order.cancel_reason}`}
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

      {/* I'm not gonna lie, this may or may not fucking explode, don't touch it please */}
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