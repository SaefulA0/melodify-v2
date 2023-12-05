import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#F6F6F6]">
        <h1 className="text-gray-900 text-2xl font-semibold mb-10">
          404 | Opps! Halaman tidak ditemukan
        </h1>
        <button
          onClick={() => router.push("/")}
          className="w-28 inline-flex justify-center rounded-md shadow-md border border-gray-900 bg-gradient-to-tl from-gray-700 via-[#252525] to-gray-800 px-4 py-2 text-sm font-medium text-slate-100 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 focus:outline-none"
        >
          Kembali
        </button>
      </div>
    </>
  );
}
