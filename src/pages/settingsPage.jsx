import React, { useState } from "react";

const SettingsPage = () => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Settings</h1>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
              JD
            </div>
            <span className="text-sm">John Doe</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        {/* Profile Settings */}
        <section className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Account Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-650 transition-colors">
              <div>
                <span className="block font-medium">Email Notifications</span>
                <span className="text-sm text-gray-400">Receive important updates via email</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-650 transition-colors">
              <div>
                <span className="block font-medium">Dark Mode</span>
                <span className="text-sm text-gray-400">Switch between dark and light mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-650 transition-colors">
              <div>
                <span className="block font-medium">Auto Updates</span>
                <span className="text-sm text-gray-400">Keep your app updated automatically</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Privacy & Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-650 transition-colors">
              <div>
                <span className="block font-medium">Two-Factor Authentication</span>
                <span className="text-sm text-gray-400">Add an extra layer of security to your account</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium text-sm">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-650 transition-colors">
              <div>
                <span className="block font-medium">Login History</span>
                <span className="text-sm text-gray-400">View your recent account activity</span>
              </div>
              <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white font-medium text-sm">
                View
              </button>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className={`px-6 py-2 rounded-md text-white font-medium transition-colors flex items-center ${
              saveStatus === "saving" 
                ? "bg-blue-400" 
                : saveStatus === "saved" 
                ? "bg-green-600" 
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {saveStatus === "saving" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : saveStatus === "saved" ? (
              <>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
                Saved!
              </>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;