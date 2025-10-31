import React, { useState } from "react";
import { useAddAddressMutation, useDeleteAddressMutation, useGetAddressesByUserIdQuery, useUpdateAddressMutation } from "../../store/api/AddressApi";


const Address = () => {
  const userId = localStorage.getItem("userId");
  const { data: addresses, isLoading } = useGetAddressesByUserIdQuery(userId);

  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  // form state
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const [editingId, setEditingId] = useState(null); // Track update mode

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD / UPDATE logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE MODE
        await updateAddress({ addressId: editingId, body: form }).unwrap();
        alert("Address updated ✅");
        setEditingId(null);
      } else {
        // ADD MODE
        await addAddress({ userId, body: form }).unwrap();
        alert("Address added ✅");
      }

      // reset form
      setForm({
        customerName: "",
        phone: "",
        addressLine: "",
        city: "",
        pincode: "",
      });

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }
  };

  // ✅ DELETE
const handleDelete = async (id) => {
  if (!confirm("Delete this address?")) return;

  try {
    const res = await deleteAddress(id).unwrap();
    alert(res.message ?? "Deleted ");
  } catch (err) {
    console.log(err);
    alert(err?.data?.message ?? "Delete failed ❌");
  }
};


  // ✅ Load address in form for editing
  const handleEdit = (addr) => {
    setForm({
      customerName: addr.customerName,
      phone: addr.phone,
      addressLine: addr.addressLine,
      city: addr.city,
      pincode: addr.pincode,
    });
    setEditingId(addr.id);
  };

  return (
    <div className="max-w-xl mx-auto p-5">

      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit Address" : "Add New Address"}
      </h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          className="border w-full px-3 py-2 rounded"
          onChange={handleChange}
          value={form.customerName}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="border w-full px-3 py-2 rounded"
          onChange={handleChange}
          value={form.phone}
          required
        />

        <input
          type="text"
          name="addressLine"
          placeholder="House No, Area, Street"
          className="border w-full px-3 py-2 rounded"
          onChange={handleChange}
          value={form.addressLine}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          className="border w-full px-3 py-2 rounded"
          onChange={handleChange}
          value={form.city}
          required
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          className="border w-full px-3 py-2 rounded"
          onChange={handleChange}
          value={form.pincode}
          required
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded mt-2"
        >
          {editingId ? "Update Address" : "Save Address"}
        </button>
      </form>

      {/* Saved Addresses */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Saved Addresses</h2>

      {isLoading && <p>Loading...</p>}

      <div className="space-y-3">
        {addresses?.map((addr) => (
          <div
            key={addr.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{addr.customerName}</p>
              <p>{addr.phone}</p>
              <p>{addr.addressLine}</p>
              <p>
                {addr.city} - {addr.pincode}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(addr)}
                className="text-blue-600 font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(addr.id)}
                className="text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
