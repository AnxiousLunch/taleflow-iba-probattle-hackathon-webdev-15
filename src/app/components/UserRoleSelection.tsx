// src/app/components/UserRoleSelection.tsx
import { UserRole } from "@/types"

interface UserRoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

export default function UserRoleSelection({ onRoleSelect }: UserRoleSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Select Your Role</h2>
        <div className="space-y-4">
          <button
            onClick={() => onRoleSelect('creator')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out"
          >
            Creator
          </button>
          <button
            onClick={() => onRoleSelect('viewer')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out"
          >
            Viewer
          </button>
        </div>
      </div>
    </div>
  )
}