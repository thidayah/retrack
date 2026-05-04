import { ArrowLeftRight, Locate, LocateFixed, LocationEdit, Minus, Plus, Redo2, Search, Trash, Undo2 } from "lucide-react";

export default function MapControls() {
  const btn = "size-8 bg-white rounded-lg shadow flex items-center justify-center hover:bg-gray-100 font-bold transition cursor-pointer";

  return (
    <div className="absolute right-4 top-4 space-y-4">
      {/* Zoom */}
      <div className="flex flex-col gap-2 bg-white/40 backdrop-blur-sm rounded-xl shadow p-2">
        <button className={btn}>
          <Plus className="size-4" />
        </button>
        <button className={btn}>
          <Minus className="size-4" />
        </button>
      </div>

      {/* Edit */}
      <div className="flex flex-col gap-2 bg-white/40 backdrop-blur-sm rounded-xl shadow p-2">
        <button className={btn}>
          <Undo2 className="size-4" />
        </button>
        <button className={btn}>
          <Redo2 className="size-4" />
        </button>
        <button className={btn}>
          <ArrowLeftRight className="size-4" />
        </button>
        <button className={`${btn} text-red-500`}>
          <Trash className="size-4" />
        </button>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2 bg-white/40 backdrop-blur-sm rounded-xl shadow p-2">
        <button className={btn}>
          <Locate className="size-4" />
        </button>
        <button className={`${btn} text-blue-500`}>
          <Search className="size-4" />
        </button>
      </div>
    </div>
  );
}