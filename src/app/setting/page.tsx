"use client";
import { useState } from "react";
import { Settings, User, Brain, Shield, Palette, Globe, Zap, Download, Upload, Trash2 } from "lucide-react";
import Taskbar from "~/components/ui/taskbar";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    model: "claude-sonnet",
    language: "auto",
    memory: true,
    theme: "dark",
    temperature: 0.7,
    maxTokens: 2048,
    streamResponse: true,
    showThinking: false,
    dataCollection: false,
    autoSave: true,
    notifications: true,
    voiceEnabled: false,
    customInstructions: "",
    responseLength: "balanced"
  });

const updateSetting = <K extends keyof typeof settings>(
  key: K,
  value: typeof settings[K]
) => {
  setSettings(prev => ({ ...prev, [key]: value }));
};

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "model", label: "Model & AI", icon: Brain },
    { id: "personalization", label: "Personalization", icon: User },
    { id: "privacy", label: "Privacy & Data", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "advanced", label: "Advanced", icon: Zap }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
        <select 
          value={settings.language}
          onChange={(e) => updateSetting("language", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="auto">Auto-detect</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="zh">Chinese</option>
          <option value="ar">Arabic</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Response Length</label>
        <select 
          value={settings.responseLength}
          onChange={(e) => updateSetting("responseLength", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="concise">Concise</option>
          <option value="balanced">Balanced</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-300">Auto-save conversations</label>
          <p className="text-xs text-gray-500">Automatically save your chat history</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => updateSetting("autoSave", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-300">Desktop notifications</label>
          <p className="text-xs text-gray-500">Get notified when responses are ready</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => updateSetting("notifications", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderModelSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">AI Model</label>
        <select 
          value={settings.model}
          onChange={(e) => updateSetting("model", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="gpt-4">GPT-4 Turbo</option>
          <option value="claude-sonnet">Claude 4.0 Sonnet</option>
          <option value="deepseek-v3">DeepSeek V3 - R1</option>
          <option value="gemini-pro">Gemini Pro</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Choose the AI model for generating responses</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Creativity Level</label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => updateSetting("temperature", parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>More Focused</span>
            <span>{settings.temperature}</span>
            <span>More Creative</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Max Response Length</label>
        <select 
          value={settings.maxTokens}
          onChange={(e) => updateSetting("maxTokens", parseInt(e.target.value))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="512">Short (512 tokens)</option>
          <option value="1024">Medium (1024 tokens)</option>
          <option value="2048">Long (2048 tokens)</option>
          <option value="4096">Very Long (4096 tokens)</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-300">Stream responses</label>
          <p className="text-xs text-gray-500">Show responses as they're being generated</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.streamResponse}
            onChange={(e) => updateSetting("streamResponse", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-300">Show thinking process</label>
          <p className="text-xs text-gray-500">Display how the AI reasons through problems</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.showThinking}
            onChange={(e) => updateSetting("showThinking", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderPersonalizationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-300">Memory & Personalization</label>
          <p className="text-xs text-gray-500">Remember details from our conversations</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.memory}
            onChange={(e) => updateSetting("memory", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Custom Instructions</label>
        <textarea
          value={settings.customInstructions}
          onChange={(e) => updateSetting("customInstructions", e.target.value)}
          placeholder="Tell the AI how you'd like it to respond. For example: 'Be concise and use bullet points' or 'Explain things as if I'm a beginner'"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">These instructions will be applied to all conversations</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-300">Voice interactions</label>
          <p className="text-xs text-gray-500">Enable voice input and responses</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.voiceEnabled}
            onChange={(e) => updateSetting("voiceEnabled", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-300">Data collection for improvements</label>
          <p className="text-xs text-gray-500">Help improve the AI by sharing conversation data</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.dataCollection}
            onChange={(e) => updateSetting("dataCollection", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Data Management</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors">
          <Download size={16} />
          <span>Export my data</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors">
          <Upload size={16} />
          <span>Import data</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors">
          <Trash2 size={16} />
          <span>Delete all conversations</span>
        </button>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
        <select 
          value={settings.theme}
          onChange={(e) => updateSetting("theme", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">System</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
        <div className="grid grid-cols-3 gap-2">
          {["Small", "Medium", "Large"].map((size) => (
            <button
              key={size}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors border border-gray-600"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Accent Color</label>
        <div className="grid grid-cols-6 gap-2">
          {["bg-blue-600", "bg-green-600", "bg-purple-600", "bg-red-600", "bg-yellow-600", "bg-pink-600"].map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full ${color} border-2 border-gray-600 hover:border-white transition-colors`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">API Endpoint</label>
        <input
          type="text"
          placeholder="https://api.example.com/v1"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Custom API endpoint for advanced users</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Request Timeout (seconds)</label>
        <input
          type="number"
          min="10"
          max="300"
          defaultValue="30"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Debug Options</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            <span className="text-sm text-gray-300">Show request/response logs</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            <span className="text-sm text-gray-300">Enable verbose mode</span>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors">
          Reset to defaults
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "model":
        return renderModelSettings();
      case "personalization":
        return renderPersonalizationSettings();
      case "privacy":
        return renderPrivacySettings();
      case "appearance":
        return renderAppearanceSettings();
      case "advanced":
        return renderAdvancedSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <>
      <Taskbar />
      <div className="min-h-screen bg-gray-900 pt-12">
        <div className="max-w-6xl mx-auto p-6 mt-[25px]">
          <div className="flex items-center space-x-3 mb-8">
            <Settings className="text-white" size={24} />
            <h1 className="text-2xl font-semibold text-white">Settings</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
}