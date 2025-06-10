import { useState } from "react";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [favorites, setFavorites] = useState({});

  const addContact = () => {
    if (!firstName || !lastName || !phone || !email) return;
    const newContact = {
      id: Date.now(),
      firstName,
      lastName,
      phone,
      email
    };
    setContacts([...contacts, newContact]);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const saveEdit = (id) => {
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, firstName, lastName, phone, email } : c
      )
    );
    setEditId(null);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
  };

  const filteredContacts = contacts.filter((c) =>
    (c.firstName + " " + c.lastName).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Management</h1>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-1 mr-2"
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-1 mr-2"
      />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-1 mr-2"
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-1 mr-2"
      />
      <button
        onClick={editId ? () => saveEdit(editId) : addContact}
        className="bg-blue-500 text-white px-3 py-1 ml-2"
      >
        {editId ? "Save" : "Add"}
      </button>

      <input
        placeholder="Search contacts"
        onChange={(e) => setSearch(e.target.value)}
        className="block mt-4 border p-1 w-full"
      />

      <ul className="mt-4">
        {filteredContacts.map((c) => (
          <li key={c.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <strong>{c.firstName} {c.lastName}</strong><br />
              📞 {c.phone} | ✉️ {c.email}<br />
              {favorites[c.id] && <span className="text-yellow-500">★ Favorite</span>}
            </div>
            <div className="space-x-2">
              <button onClick={() => {
                setEditId(c.id);
                setFirstName(c.firstName);
                setLastName(c.lastName);
                setPhone(c.phone);
                setEmail(c.email);
              }} className="bg-green-500 text-white px-2 py-1">Edit</button>

              <button onClick={() => deleteContact(c.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>

              <button onClick={() => setFavorites({ ...favorites, [c.id]: !favorites[c.id] })} className="bg-yellow-400 text-black px-2 py-1">
                {favorites[c.id] ? "Remove ★" : "Add ★"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
