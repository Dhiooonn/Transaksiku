import { Camera } from "lucide-react";

export default function ProfileCard() {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "User", email: "user@example.com" };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
      
      <div className="relative pt-10">
        <div className="relative mx-auto w-28 h-28">
           <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-lg">
             <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl font-bold overflow-hidden border border-slate-200">
                {/* Logic Foto Profil */}
                {user.photo ? <img src={user.photo} alt="Profile" className="w-full h-full object-cover"/> : user.name.charAt(0)}
             </div>
           </div>
           <button className="absolute bottom-1 right-1 bg-slate-800 text-white p-2 rounded-full hover:bg-blue-600 transition shadow-md border-2 border-white">
             <Camera size={14} />
           </button>
        </div>

        <h2 className="mt-4 text-xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-slate-500 text-sm font-medium">{user.email}</p>
        <div className="mt-4 flex justify-center gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
            Admin
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
            Verified
            </span>
        </div>
      </div>
    </div>
  );
}