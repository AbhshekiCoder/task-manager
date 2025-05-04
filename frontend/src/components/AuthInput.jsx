export default function AuthInput({ placeholder, type = 'text' }) {
    return (
      <input type={type} placeholder={placeholder} className="w-full p-2 mb-4 rounded bg-white/20" />
    );
  }
  