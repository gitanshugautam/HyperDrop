import { useState } from "react";

const AddressOverlay = ({ open, onClose, onSave, autoArea }) => {
  if (!open) return null;

  const [flat, setFlat] = useState("");
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState(autoArea || "");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSave = () => {
    if (!flat || !area || !name || !mobile) {
      alert("Please fill all required fields");
      return;
    }

    onSave({
      flat,
      floor,
      area,
      name,
      mobile,
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-[380px] bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Add your address
          </h2>

          <div className="space-y-3">
            {/* Flat / House */}
            <input
              type="text"
              placeholder="Flat / House / Building *"
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />

            {/* Floor */}
            <input
              type="text"
              placeholder="Floor (optional)"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />

            {/* Area */}
            <input
              type="text"
              placeholder="Area *"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />

            {/* Name */}
            <input
              type="text"
              placeholder="Your name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />

            {/* Mobile */}
            <input
              type="tel"
              placeholder="Mobile number *"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border text-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressOverlay;
