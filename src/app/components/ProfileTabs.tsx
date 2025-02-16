interface ProfileTabsProps {
    activeTab: string
    setActiveTab: (tab: string) => void
    userRole: string
  }
  
  export default function ProfileTabs({ activeTab, setActiveTab, userRole }: ProfileTabsProps) {
    return (
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeTab === "public" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setActiveTab("public")}
        >
          Public
        </button>
        {userRole === "creator" && (
          <button
            className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeTab === "private" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("private")}
          >
            Private
          </button>
        )}
      </div>
    )
  }
  
  