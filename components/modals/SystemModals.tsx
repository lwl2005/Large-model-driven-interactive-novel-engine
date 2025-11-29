
import React, { useState, useEffect } from 'react';
import { GalleryItem, ImageModel, AvatarStyle, BackgroundStyle, InputMode, PromptModule, generateUUID } from '../../types';

interface GalleryModalProps {
    gallery: GalleryItem[];
    onClose: () => void;
    onViewImage: (item: GalleryItem) => void;
    onDelete: (id: string) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ gallery, onClose, onViewImage, onDelete }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in-up" onClick={onClose}>
            <div 
                className="bg-stone-100 border border-stone-200 rounded-xl max-w-4xl w-full h-[600px] max-h-[90vh] flex flex-col shadow-2xl text-gray-800" 
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50 rounded-t-xl">
                    <h3 className="font-bold text-lg text-pink-700">艺术画廊</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 font-bold">✕</button>
                </div>

                {gallery.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <span className="text-4xl mb-2">🖼️</span>
                        <p>画廊是空的，快去游戏中收藏一些瞬间吧！</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gallery.map(item => (
                                <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden group shadow-md border border-gray-200">
                                    <img src={item.base64} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-xs font-bold line-clamp-2">{item.prompt}</p>
                                    </div>
                                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => onViewImage(item)} className="bg-black/50 hover:bg-black/70 text-white w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V8m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5v4m0 0h-4" /></svg>
                                        </button>
                                        <button onClick={() => onDelete(item.id)} className="bg-red-500/80 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const ImageViewer = ({ image, onClose }: { image: GalleryItem, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4" onClick={onClose}>
            <div className="relative max-w-4xl max-h-[90vh] animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <img src={image.base64} className="w-full h-full object-contain rounded-lg shadow-2xl" />
                <div className="absolute -bottom-12 left-0 w-full text-center text-white/80 p-2 text-xs line-clamp-2 bg-black/20 rounded">{image.prompt}</div>
                <button onClick={onClose} className="absolute -top-4 -right-4 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">&times;</button>
            </div>
        </div>
    );
};

interface SettingsModalProps {
    onClose: () => void;
    aiModel: string;
    setAiModel: (m: string) => void;
    imageModel: ImageModel;
    setImageModel: (m: ImageModel) => void;
    avatarStyle: AvatarStyle;
    setAvatarStyle: (s: AvatarStyle) => void;
    customAvatarStyle: string;
    setCustomAvatarStyle: (s: string) => void;
    avatarRefImage: string;
    setAvatarRefImage: (s: string) => void;
    backgroundStyle: BackgroundStyle;
    setBackgroundStyle: (s: BackgroundStyle) => void;
    inputMode: InputMode;
    setInputMode: (m: InputMode) => void;
    
    // ModelScope
    modelScopeApiKey: string;
    setModelScopeApiKey: (key: string) => void;
    onTestModelScope: (key: string) => Promise<string>;

    // Audio Props
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
    volume: number;
    setVolume: (vol: number) => void;

    // Custom Prompt Props
    customPrompt: string;
    setCustomPrompt: (s: string) => void;
    
    // Extra Prompt Modules
    promptModules: PromptModule[];
    handleAddPromptModule: (module: PromptModule) => void;
    handleUpdatePromptModule: (module: PromptModule) => void;
    handleDeletePromptModule: (id: string) => void;
    
    // Display Props
    showStoryPanelBackground: boolean;
    setShowStoryPanelBackground: (show: boolean) => void;
    historyFontSize: number;
    setHistoryFontSize: (n: number) => void;
    storyFontSize: number;
    setStoryFontSize: (n: number) => void;
    storyFontFamily?: string;
    setStoryFontFamily?: (f: string) => void;
    
    // Auto Save Gallery
    autoSaveGallery: boolean;
    setAutoSaveGallery: (val: boolean) => void;

    // Custom Connection
    customBaseUrl: string;
    handleSetCustomBaseUrl: (url: string) => void;
    customApiKey: string;
    handleSetCustomApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
    onClose, 
    aiModel, setAiModel, 
    imageModel, setImageModel,
    avatarStyle, setAvatarStyle, 
    customAvatarStyle, setCustomAvatarStyle,
    avatarRefImage, setAvatarRefImage,
    backgroundStyle, setBackgroundStyle, 
    inputMode, setInputMode,
    modelScopeApiKey, setModelScopeApiKey,
    onTestModelScope,
    isMuted, setIsMuted,
    volume, setVolume,
    customPrompt, setCustomPrompt,
    promptModules, handleAddPromptModule, handleUpdatePromptModule, handleDeletePromptModule,
    showStoryPanelBackground, setShowStoryPanelBackground,
    historyFontSize, setHistoryFontSize,
    storyFontSize, setStoryFontSize,
    storyFontFamily, setStoryFontFamily,
    autoSaveGallery, setAutoSaveGallery,
    customBaseUrl, handleSetCustomBaseUrl,
    customApiKey, handleSetCustomApiKey
}) => {
    const [activeTab, setActiveTab] = useState<'model' | 'prompt' | 'avatar' | 'display' | 'gameplay' | 'audio' | 'connection'>('model');
    
    // Local state for connection testing
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<{success: boolean, message: string} | null>(null);

    // Auto Assign Logic State
    const [modelListText, setModelListText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisLog, setAnalysisLog] = useState<string[]>([]);
    const [analysisResult, setAnalysisResult] = useState<{text?: string, image?: string} | null>(null);
    const [showKeyInput, setShowKeyInput] = useState(false);

    const TabButton = ({ id, label }: { id: string, label: string }) => (
        <button 
            onClick={() => setActiveTab(id as any)}
            className={`
                w-full text-left p-4 font-mono text-sm border-l-4 transition-all duration-300 flex items-center gap-3 outline-none
                ${activeTab === id 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold' 
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-black/5'
                }
            `}
        >
            <span className="tracking-widest">{label}</span>
        </button>
    );

    const handleTestConnection = async () => {
        if (!modelScopeApiKey) return;
        setIsTesting(true);
        setTestResult(null);
        try {
            const msg = await onTestModelScope(modelScopeApiKey);
            setTestResult({ success: true, message: msg });
        } catch (e: any) {
            setTestResult({ success: false, message: e.message || "未知错误" });
        } finally {
            setIsTesting(false);
        }
    };

    const handleRefImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarRefImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarStyleChange = (style: AvatarStyle) => {
        setAvatarStyle(style);
        if (style === 'realistic') {
            setBackgroundStyle('realistic');
        } else if (style === 'anime' || style === 'ink' || style === '3d') {
            setBackgroundStyle('anime');
        }
    };

    const handleAutoAssign = async () => {
        setIsAnalyzing(true);
        setAnalysisLog([]);
        setAnalysisResult(null);

        const addLog = (msg: string) => {
            setAnalysisLog(prev => [...prev, msg]);
        };

        addLog("Initializing Neural Scanner...");
        await new Promise(r => setTimeout(r, 200));

        let models: string[] = [];
        
        // 1. Fetch Remote Models
        try {
            addLog("Checking API Endpoint Configuration...");
            const apiKey = customApiKey || process.env.API_KEY;
            
            if (!apiKey) {
                throw new Error("No API Key found. Please configure Custom Key or env.");
            }

            let url = "";
            let headers: Record<string, string> = {};

            // Heuristic to determine if we are using standard Google API or a Custom Proxy
            // Standard OpenAI/Proxy: Authorization: Bearer <key>
            // Standard Google: ?key=<key>
            
            if (customBaseUrl && customBaseUrl.trim().length > 0) {
                addLog(`Using Custom Base URL: ${customBaseUrl}`);
                // Remove trailing slash
                let cleanBase = customBaseUrl.replace(/\/$/, "");
                
                // User might input '.../v1' or just '.../v1/models' or just root.
                // Standard convention for OpenAI proxies is to expose /models
                // If it ends in /models, use as is. If not, append /models.
                if (cleanBase.endsWith("/models")) {
                    url = cleanBase;
                } else {
                    url = `${cleanBase}/models`;
                }
                
                headers = { 
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                };
            } else {
                addLog("Using Default Google Gemini Endpoint...");
                url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
                // Google doesn't strictly need headers if key is in query param
            }

            addLog(`Fetching model list from: ${url}`);
            
            const response = await fetch(url, { method: 'GET', headers });
            
            if (!response.ok) {
                let errText = await response.text();
                // Try to clean up error text
                try {
                    const errJson = JSON.parse(errText);
                    errText = JSON.stringify(errJson.error || errJson, null, 0);
                } catch(e) {}
                
                throw new Error(`HTTP ${response.status}: ${errText.substring(0, 100)}`);
            }

            const data = await response.json();
            addLog("Data received. Parsing structure...");
            
            // 2. Parse Response (Support multiple formats)
            if (data.models && Array.isArray(data.models)) {
                // Google Format: { models: [{ name: "models/gemini-pro" }] }
                models = data.models.map((m: any) => m.name.replace(/^models\//, ''));
                addLog(`Detected Google Protocol. Found ${models.length} models.`);
            } else if (data.data && Array.isArray(data.data)) {
                // OpenAI Format: { data: [{ id: "gpt-4" }] }
                models = data.data.map((m: any) => m.id);
                addLog(`Detected OpenAI/Proxy Protocol. Found ${models.length} models.`);
            } else {
                // Fallback: Try to find any array in the object
                const possibleList = Object.values(data).find(v => Array.isArray(v)) as any[];
                if (possibleList) {
                    models = possibleList.map((m: any) => m.id || m.name || (typeof m === 'string' ? m : JSON.stringify(m)));
                    addLog(`Extracted ${models.length} items from unknown response structure.`);
                } else {
                    addLog("Warning: Could not identify model list format.");
                    addLog(`Response keys: ${Object.keys(data).join(', ')}`);
                    throw new Error("Could not parse models from response.");
                }
            }

            // Update the cache/textarea so the user sees what was found
            setModelListText(models.join('\n'));

        } catch (e: any) {
            addLog(`Network Fetch Failed: ${e.message}`);
            if (e.message.includes('Failed to fetch')) {
                addLog("Hint: Check CORS settings if accessing direct URL from browser.");
            }
            addLog("Falling back to manual text input analysis...");
            // Fallback to what's in the textarea if network fails
            if (modelListText.trim()) {
                models = modelListText.split(/[\n,;]/).map(s => s.trim()).filter(s => s.length > 0);
            }
        }

        if (models.length === 0) {
            addLog("No models found to analyze.");
            setIsAnalyzing(false);
            return;
        }

        addLog(`Analyzing ${models.length} candidate models...`);
        await new Promise(r => setTimeout(r, 300));

        let bestText = "";
        let bestImage = "";
        let textScore = -1;
        let imageScore = -1;

        for (const model of models) {
            const m = model.toLowerCase();
            let currentTextScore = 0;
            let currentImageScore = 0;

            // Image scoring
            if (m.includes('image') || m.includes('diffusion') || m.includes('dall') || m.includes('journey') || m.includes('flux')) {
                currentImageScore += 10;
            } else if (m.includes('vision')) {
                // Vision is often multimodal text, not image gen, but better than pure text for image understanding
                currentImageScore += 2; 
            } else {
                currentImageScore = 0; // Not an image model
            }

            // Text scoring
            if (m.includes('pro') || m.includes('ultra') || m.includes('gpt-4') || m.includes('opus') || m.includes('sonnet') || m.includes('gemini-1.5')) {
                currentTextScore += 10;
            } else if (m.includes('flash') || m.includes('turbo') || m.includes('haiku') || m.includes('gemini')) {
                currentTextScore += 8; // Good for speed
            } else if (m.includes('gpt-3.5') || m.includes('mini')) {
                currentTextScore += 5;
            } else if (m.includes('embedding') || m.includes('bison')) {
                currentTextScore = 0; // Skip embeddings
            }

            // Avoid assigning image models to text slot
            if (currentImageScore > 5) currentTextScore = -1;

            if (currentImageScore > imageScore) {
                imageScore = currentImageScore;
                bestImage = model;
                if (currentImageScore > 0) addLog(`[VISUAL] Candidate: ${model}`);
            }
            if (currentTextScore > textScore) {
                textScore = currentTextScore;
                bestText = model;
                if (currentTextScore > 8) addLog(`[TEXT] Strong Candidate: ${model}`);
            }
        }

        addLog("Analysis Complete.");
        
        if (bestText) {
            addLog(`>> Assigning TEXT Engine: ${bestText}`);
            setAiModel(bestText);
        } else {
            addLog(">> No suitable Text Engine found. Keeping current.");
        }

        if (bestImage && imageScore > 0) {
            addLog(`>> Assigning IMAGE Engine: ${bestImage}`);
            // @ts-ignore
            setImageModel(bestImage);
        } else {
            addLog(">> No dedicated Image Engine found.");
        }

        setAnalysisResult({ text: bestText, image: bestImage });
        setIsAnalyzing(false);
    };

    const handleCreatePromptModule = () => {
        const newModule: PromptModule = {
            id: generateUUID(),
            title: "新规则",
            isActive: true,
            content: ""
        };
        handleAddPromptModule(newModule);
    };

    const fontOptions = [
        { label: '现代黑体 (Noto Sans)', value: "'Noto Sans SC', sans-serif" },
        { label: '经典宋体 (Noto Serif)', value: "'Noto Serif SC', serif" },
        { label: '古风行楷 (Ma Shan Zheng)', value: "'Ma Shan Zheng', cursive" },
        { label: '系统楷体 (KaiTi)', value: "'KaiTi', 'STKaiti', serif" }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-mono">
              <div className="bg-stone-100 border border-stone-200 rounded-2xl max-w-3xl w-full shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row h-[600px] max-h-[90vh] animate-fade-in-up relative overflow-hidden text-gray-800">
                  
                  {/* Decorative Header Lines */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 z-30"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[100px] pointer-events-none"></div>

                  {/* Left Sidebar */}
                  <div className="w-full md:w-64 bg-stone-50 border-r border-stone-200 flex flex-col z-20">
                      <div className="p-6 border-b border-stone-200">
                          <h3 className="text-xl font-bold text-indigo-700 tracking-[0.2em] flex items-center gap-2">
                              <span className="text-2xl">⚙</span>
                              系统设置
                          </h3>
                          <div className="text-[9px] text-gray-400 mt-1 tracking-widest">PROTAGONIST_HALO v2.5</div>
                      </div>
                      
                      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
                          <TabButton id="model" label="AI 模型配置" />
                          <TabButton id="connection" label="开发者 / 连接" />
                          <TabButton id="prompt" label="提示词设置" />
                          <TabButton id="avatar" label="角色绘图设置" />
                          <TabButton id="display" label="显示设置" />
                          <TabButton id="gameplay" label="交互控制" />
                          <TabButton id="audio" label="音频设置" />
                      </div>

                      <div className="p-4 border-t border-stone-200">
                         <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-400 w-2/3 animate-pulse"></div>
                         </div>
                         <div className="flex justify-between text-[8px] text-gray-400 mt-1 font-mono">
                             <span>内存占用</span>
                             <span>64%</span>
                         </div>
                      </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 bg-stone-100 relative flex flex-col z-20 overflow-hidden">
                      {/* Content Header */}
                      <div className="flex justify-between items-center p-6 border-b border-stone-200 bg-stone-100 shrink-0 z-10">
                          <h4 className="text-lg font-bold text-gray-700 tracking-wider">
                              {activeTab === 'model' && '> AI 核心模型配置'}
                              {activeTab === 'connection' && '> 开发者 / 自定义连接'}
                              {activeTab === 'prompt' && '> 自定义写作规则'}
                              {activeTab === 'avatar' && '> 人物形象生成参数'}
                              {activeTab === 'display' && '> 视觉显示配置'}
                              {activeTab === 'gameplay' && '> 交互控制系统'}
                              {activeTab === 'audio' && '> 音频与音效控制'}
                          </h4>
                          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors text-xl font-bold px-2">
                              [X]
                          </button>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 relative">
                          {/* Use a fade-in opacity animation instead of transforms to prevent layout flashing */}
                          <div className="space-y-8 animate-fade-in-opacity" key={activeTab}>
                                <style>{`@keyframes fade-in-opacity { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in-opacity { animation: fade-in-opacity 0.4s ease-out; }`}</style>
                                {activeTab === 'model' && (
                                    <div className="space-y-8">
                                        {/* Text Models */}
                                        <div>
                                            <div className="text-xs text-indigo-600/70 uppercase tracking-widest mb-3 border-l-2 border-indigo-400 pl-2">文本生成引擎</div>
                                            <div className="grid grid-cols-1 gap-3">
                                                {[
                                                    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', desc: '旗舰性能 // 默认推荐' },
                                                    { id: 'gemini-3-pro-preview', name: 'Gemini 3.0 Pro', desc: '高推理能力 // 进阶选择' },
                                                    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: '标准速度 // 性能均衡' },
                                                ].map(m => (
                                                    <button 
                                                        key={m.id} 
                                                        onClick={() => setAiModel(m.id)} 
                                                        className={`group relative p-4 border transition-all text-left overflow-hidden ${aiModel === m.id ? 'border-indigo-500 bg-indigo-50' : 'border-stone-200 bg-white hover:border-gray-400'}`}
                                                    >
                                                        {aiModel === m.id && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-indigo-500"></div>}
                                                        <div className={`font-bold font-mono text-sm tracking-wider ${aiModel === m.id ? 'text-indigo-700' : 'text-gray-600'}`}>{m.name}</div>
                                                        <div className="text-[10px] text-gray-400 mt-1 font-mono">{m.desc}</div>
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            {/* Show custom model if selected */}
                                            {![ 'gemini-2.5-pro', 'gemini-3-pro-preview', 'gemini-2.5-flash' ].includes(aiModel) && (
                                                <div className="mt-2 p-3 bg-amber-50 border border-amber-300 rounded text-amber-800 text-xs flex items-center gap-2">
                                                    <span className="font-bold">⚠️ 当前使用自定义模型:</span> 
                                                    <span className="font-mono">{aiModel}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Image Models - Gemini */}
                                        <div>
                                            <div className="text-xs text-pink-600/70 uppercase tracking-widest mb-3 border-l-2 border-pink-400 pl-2">视觉渲染引擎 (Gemini)</div>
                                            <div className="grid grid-cols-1 gap-3">
                                                {[
                                                    { id: 'gemini-2.5-flash-image-preview', name: 'Gemini 2.5 Flash Image Preview', desc: '实验性模型 // 最新技术' },
                                                    { id: 'gemini-2.5-flash-image', name: 'Gemini 2.5 Flash Image', desc: '标准渲染 // 快速生成' }
                                                ].map(m => (
                                                    <button 
                                                        key={m.id} 
                                                        onClick={() => setImageModel(m.id as ImageModel)} 
                                                        className={`group relative p-4 border transition-all text-left overflow-hidden ${imageModel === m.id ? 'border-pink-500 bg-pink-50' : 'border-stone-200 bg-white hover:border-gray-400'}`}
                                                    >
                                                        {imageModel === m.id && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-pink-500"></div>}
                                                        <div className={`font-bold font-mono text-sm tracking-wider ${imageModel === m.id ? 'text-pink-700' : 'text-gray-600'}`}>{m.name}</div>
                                                        <div className="text-[10px] text-gray-400 mt-1 font-mono">{m.desc}</div>
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            {/* Show custom model if selected */}
                                            {![ 'gemini-2.5-flash-image-preview', 'gemini-2.5-flash-image', 'Qwen/Qwen-Image', 'MusePublic/FLUX.1' ].includes(imageModel) && (
                                                <div className="mt-2 p-3 bg-amber-50 border border-amber-300 rounded text-amber-800 text-xs flex items-center gap-2">
                                                    <span className="font-bold">⚠️ 当前使用自定义模型:</span> 
                                                    <span className="font-mono">{imageModel}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Image Models - ModelScope */}
                                        <div>
                                            <div className="text-xs text-purple-600/70 uppercase tracking-widest mb-3 border-l-2 border-purple-400 pl-2">魔搭 (ModelScope)</div>
                                            
                                            <div className="mb-4 bg-white p-3 border border-stone-200 rounded-lg">
                                                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">ModelScope SDK Token</label>
                                                <div className="flex gap-2">
                                                    <input 
                                                        type="password"
                                                        value={modelScopeApiKey}
                                                        onChange={(e) => {
                                                            setModelScopeApiKey(e.target.value);
                                                            setTestResult(null); // Reset test result on change
                                                        }}
                                                        placeholder="输入 Key (不会上传至服务器)"
                                                        className="flex-1 bg-stone-50 border border-stone-300 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-purple-500 outline-none transition-colors font-mono"
                                                    />
                                                    <button
                                                        onClick={handleTestConnection}
                                                        disabled={!modelScopeApiKey || isTesting}
                                                        className={`px-3 py-1 text-xs font-bold rounded border transition-all flex items-center gap-2
                                                            ${isTesting ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'}
                                                        `}
                                                    >
                                                        {isTesting ? (
                                                            <span className="animate-spin">⟳</span>
                                                        ) : (
                                                            <span>⚡</span>
                                                        )}
                                                        测试
                                                    </button>
                                                </div>
                                                
                                                {/* Test Result Feedback */}
                                                {testResult && (
                                                    <div className={`mt-2 text-[10px] font-bold flex items-center gap-1 ${testResult.success ? 'text-green-600' : 'text-red-500'}`}>
                                                        <span>{testResult.success ? '✓' : '✕'}</span>
                                                        {testResult.message}
                                                    </div>
                                                )}

                                                {!testResult && (
                                                    <p className="text-[9px] text-gray-400 mt-1 font-mono leading-tight">
                                                        注意：浏览器直接调用 ModelScope API 可能会因 CORS 策略失败。
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-3">
                                                {[
                                                    { id: 'Qwen/Qwen-Image', name: 'Qwen/Qwen-Image', desc: '通义千问视觉生成' },
                                                    { id: 'MusePublic/FLUX.1', name: 'MusePublic/FLUX.1', desc: 'FLUX 高质量文生图' }
                                                ].map(m => (
                                                    <button 
                                                        key={m.id} 
                                                        onClick={() => setImageModel(m.id as ImageModel)} 
                                                        className={`group relative p-4 border transition-all text-left overflow-hidden ${imageModel === m.id ? 'border-purple-500 bg-purple-50' : 'border-stone-200 bg-white hover:border-gray-400'}`}
                                                    >
                                                        {imageModel === m.id && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-purple-500"></div>}
                                                        <div className={`font-bold font-mono text-sm tracking-wider ${imageModel === m.id ? 'text-purple-700' : 'text-gray-600'}`}>{m.name}</div>
                                                        <div className="text-[10px] text-gray-400 mt-1 font-mono">{m.desc}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'connection' && (
                                    <div className="space-y-6">
                                        {/* Custom Endpoint Config */}
                                        <div className="bg-stone-50 p-4 border border-stone-300 rounded-xl relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
                                            <div className="text-xs text-teal-700 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <span className="text-lg">🔌</span> 自定义接口连接
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">API Endpoint (Base URL)</label>
                                                    <input 
                                                        type="text" 
                                                        value={customBaseUrl}
                                                        onChange={(e) => handleSetCustomBaseUrl(e.target.value)}
                                                        placeholder="例如: https://my-custom-proxy.com/v1"
                                                        className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-gray-800 font-mono focus:border-teal-500 outline-none transition-colors"
                                                    />
                                                    <p className="text-[9px] text-gray-400 mt-1">留空则使用官方默认地址。请确保代理接口兼容 Gemini/OpenAI 格式。</p>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="text-[10px] text-gray-500 uppercase font-bold block">Custom API Key</label>
                                                        <button 
                                                            onClick={() => setShowKeyInput(!showKeyInput)}
                                                            className="text-[9px] text-teal-600 hover:text-teal-800 underline"
                                                        >
                                                            {showKeyInput ? "使用默认环境变量" : "覆盖默认 Key"}
                                                        </button>
                                                    </div>
                                                    {showKeyInput ? (
                                                        <input 
                                                            type="password" 
                                                            value={customApiKey}
                                                            onChange={(e) => handleSetCustomApiKey(e.target.value)}
                                                            placeholder="sk-..."
                                                            className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-gray-800 font-mono focus:border-teal-500 outline-none transition-colors"
                                                        />
                                                    ) : (
                                                        <div className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 text-sm text-gray-400 font-mono italic cursor-not-allowed">
                                                            Using process.env.API_KEY (Secure)
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Model Scanner & Auto-Allocator */}
                                        <div className="bg-black rounded-xl p-4 border border-stone-600 shadow-2xl relative overflow-hidden">
                                            {/* Screen Glare Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                                            
                                            <div className="flex justify-between items-center mb-4 border-b border-stone-800 pb-2">
                                                <div className="text-xs text-green-500 font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                                                    <span className="animate-pulse">●</span> 远程模型扫描与自动适配
                                                </div>
                                                <span className="text-[9px] text-stone-500 font-mono">SYS.ALLOCATOR.V2</span>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <button 
                                                    onClick={handleAutoAssign}
                                                    disabled={isAnalyzing}
                                                    className={`w-full py-2 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-green-400 font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${isAnalyzing ? 'animate-pulse' : ''}`}
                                                >
                                                    {isAnalyzing ? (
                                                        <><span>Scanning Remote...</span><span className="animate-spin">⟳</span></>
                                                    ) : (
                                                        <><span>Connect & Fetch Models</span><span>⚡</span></>
                                                    )}
                                                </button>

                                                {/* Terminal Log */}
                                                <div className="bg-black/50 rounded border border-stone-800 p-3 h-32 overflow-y-auto custom-scrollbar font-mono text-[10px] space-y-1">
                                                    {analysisLog.length === 0 && <span className="text-stone-600 italic">>> System Ready. Click 'Connect' to scan available models.</span>}
                                                    {analysisLog.map((log, i) => (
                                                        <div key={i} className="text-green-500/80 border-l-2 border-green-900 pl-2 animate-fade-in-left">
                                                            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                                            {log}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Result Display */}
                                                {analysisResult && (
                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                        <div className="bg-stone-900 border border-green-500/30 p-2 rounded text-center">
                                                            <div className="text-[9px] text-stone-500 uppercase mb-1">Assigned Text Engine</div>
                                                            <div className="text-xs text-green-400 font-bold truncate" title={analysisResult.text}>{analysisResult.text || "No Change"}</div>
                                                        </div>
                                                        <div className="bg-stone-900 border border-green-500/30 p-2 rounded text-center">
                                                            <div className="text-[9px] text-stone-500 uppercase mb-1">Assigned Visual Engine</div>
                                                            <div className="text-xs text-green-400 font-bold truncate" title={analysisResult.image}>{analysisResult.image || "No Change"}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {/* Hidden or Readonly Model List */}
                                                {modelListText && (
                                                    <div className="relative mt-2">
                                                        <div className="text-[9px] text-stone-500 mb-1">Found Models Cache:</div>
                                                        <textarea 
                                                            readOnly
                                                            value={modelListText}
                                                            className="w-full h-16 bg-stone-900/50 border border-stone-800 rounded p-2 text-[10px] text-stone-400 font-mono focus:outline-none resize-none custom-scrollbar"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'prompt' && (
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-xs text-indigo-600/70 uppercase tracking-widest mb-3 border-l-2 border-indigo-400 pl-2">
                                                主提示词 (Main Prompt)
                                            </div>
                                            <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">
                                                在此输入的指令将被附加到所有剧情生成的 Prompt 中。你可以用来规定写作风格、禁止特定词汇、强制特定叙事视角或调整对话比例。
                                            </p>
                                            <textarea 
                                                value={customPrompt}
                                                onChange={(e) => setCustomPrompt(e.target.value)}
                                                placeholder="例如：请使用更华丽辞藻的古风文笔；或：禁止出现任何现代词汇；或：侧重心理描写..."
                                                className="w-full h-32 bg-white border border-stone-300 rounded-lg p-4 text-sm text-gray-800 font-mono focus:border-indigo-500 outline-none transition-all placeholder-gray-400 resize-y custom-scrollbar leading-relaxed shadow-inner"
                                            />
                                            <div className="flex justify-between mt-2">
                                                <span className="text-[9px] text-gray-400">已输入 {customPrompt.length} 字符</span>
                                                <button 
                                                    onClick={() => setCustomPrompt('')}
                                                    className="text-[10px] text-red-400 hover:text-red-600 font-bold"
                                                >
                                                    清空内容
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border-t border-stone-200 pt-6">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="text-xs text-purple-600/70 uppercase tracking-widest border-l-2 border-purple-400 pl-2">
                                                    扩展提示词模块 (Extra Prompt Modules)
                                                </div>
                                                <button 
                                                    onClick={() => handleAddPromptModule({ id: generateUUID(), isActive: true, title: "新规则", content: "" })}
                                                    className="text-[10px] bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded border border-purple-200 font-bold transition-colors"
                                                >
                                                    + 添加新模块
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                {promptModules.map(module => (
                                                    <div key={module.id} className={`border rounded-lg p-3 transition-all ${module.isActive ? 'bg-white border-purple-200 shadow-sm' : 'bg-stone-50 border-stone-200 opacity-70'}`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={module.isActive}
                                                                    onChange={(e) => handleUpdatePromptModule({ ...module, isActive: e.target.checked })}
                                                                    className="w-4 h-4 accent-purple-600 cursor-pointer"
                                                                />
                                                                <input 
                                                                    type="text" 
                                                                    value={module.title}
                                                                    onChange={(e) => handleUpdatePromptModule({ ...module, title: e.target.value })}
                                                                    className="text-xs font-bold bg-transparent border-b border-transparent focus:border-purple-300 outline-none w-32 focus:w-48 transition-all"
                                                                    placeholder="模块标题"
                                                                />
                                                            </div>
                                                            <button 
                                                                onClick={() => handleDeletePromptModule(module.id)}
                                                                className="text-gray-400 hover:text-red-500 px-2"
                                                                title="删除"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                        <textarea 
                                                            value={module.content}
                                                            onChange={(e) => handleUpdatePromptModule({ ...module, content: e.target.value })}
                                                            placeholder="在此输入额外的提示词规则，例如特定的剧情走向要求、风格限制或开车指令..."
                                                            className="w-full h-20 bg-stone-50 border border-stone-200 rounded p-2 text-xs text-gray-700 font-mono focus:border-purple-300 focus:bg-white outline-none transition-all resize-y"
                                                        />
                                                    </div>
                                                ))}
                                                {promptModules.length === 0 && (
                                                    <div className="text-center py-6 border-2 border-dashed border-stone-200 rounded-lg text-gray-400 text-xs">
                                                        暂无额外模块，点击上方按钮添加。<br/>
                                                        (可用于添加如"开车"、"战斗特化"等开关式 Prompt)
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'avatar' && (
                                    <div className="space-y-6">
                                        <div className="text-xs text-gray-500 mb-2">选择或自定义角色头像的视觉风格。</div>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            {['anime', 'realistic', '3d', 'ink'].map(style => (
                                                <button 
                                                    key={style} 
                                                    onClick={() => handleAvatarStyleChange(style as AvatarStyle)} 
                                                    className={`group relative p-4 border text-center transition-all flex flex-col items-center justify-center overflow-hidden ${avatarStyle === style ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-stone-200 bg-white text-gray-600 hover:border-gray-400'}`}
                                                >
                                                    {avatarStyle === style && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-indigo-500"></div>}
                                                    <div className="text-sm font-bold uppercase tracking-wider font-mono">
                                                        {style === 'anime' ? '二次元' : style === 'realistic' ? '写实摄影' : style === '3d' ? '3D 渲染' : '水墨国风'}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-stone-200">
                                            <label className="text-xs text-indigo-600/70 uppercase tracking-widest mb-2 block">自定义风格指令 (可选)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{'>'}</span>
                                                <input 
                                                    type="text" 
                                                    value={customAvatarStyle}
                                                    onChange={(e) => setCustomAvatarStyle(e.target.value)}
                                                    placeholder="例: 赛博朋克霓虹, 油画质感, 像素风..."
                                                    className="w-full bg-white border border-stone-300 p-3 pl-8 text-sm text-gray-800 font-mono focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-stone-200">
                                            <label className="text-xs text-indigo-600/70 uppercase tracking-widest mb-2 block flex items-center justify-between">
                                                <span>垫图参考</span>
                                                <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1 rounded">实验功能</span>
                                            </label>
                                            <div className="bg-white p-3 border border-stone-200 rounded-lg">
                                                <p className="text-[10px] text-gray-400 mb-2">上传一张图片，AI 将参考其画风来生成角色头像。后端将同步此参考图进行生成。</p>
                                                
                                                {!avatarRefImage ? (
                                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                                                        <input 
                                                            type="file" 
                                                            accept="image/*"
                                                            onChange={handleRefImageUpload}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="text-gray-400 text-sm font-bold">
                                                            点击上传参考图
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden group">
                                                        <img src={avatarRefImage} className="w-full h-full object-cover opacity-80" />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => setAvatarRefImage('')}
                                                                className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold"
                                                            >
                                                                清除图片
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'display' && (
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-xs text-indigo-600/70 uppercase tracking-widest mb-3 border-l-2 border-indigo-400 pl-2">视觉显示配置</div>
                                            
                                            <div className="space-y-6">
                                                <div className="space-y-6">
                                                    <div className="group relative p-6 bg-white rounded border border-stone-200 flex items-center justify-between hover:border-gray-300 transition-colors">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-sm text-gray-700 mb-1 font-mono">剧情面板背景</span>
                                                            <span className="text-[10px] text-gray-400 font-mono">是否显示文字背后的半透明面板与边框</span>
                                                        </div>
                                                        <button 
                                                            onClick={() => setShowStoryPanelBackground(!showStoryPanelBackground)}
                                                            className={`w-14 h-8 rounded-full relative transition-colors duration-300 focus:outline-none ${showStoryPanelBackground ? 'bg-indigo-500' : 'bg-gray-300'}`}
                                                        >
                                                            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${showStoryPanelBackground ? 'left-7' : 'left-1'}`}></div>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">初始背景风格</label>
                                                    <div className="flex flex-col gap-3">
                                                        <button 
                                                            onClick={() => setBackgroundStyle('anime')} 
                                                            className={`group relative h-20 px-6 py-2 border flex flex-row items-center justify-between gap-2 transition-all overflow-hidden rounded-lg ${backgroundStyle === 'anime' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-stone-200 text-gray-500 hover:border-gray-300'}`}
                                                        >
                                                            {backgroundStyle === 'anime' && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-indigo-500"></div>}
                                                            <div className="flex flex-col items-start">
                                                                <div className="font-bold text-sm font-mono uppercase">二次元风格</div>
                                                                <div className="text-[10px] opacity-70 mt-0.5">明亮色彩 / 动画渲染 / 赛璐珞风格</div>
                                                            </div>
                                                        </button>

                                                        <button 
                                                            onClick={() => setBackgroundStyle('realistic')} 
                                                            className={`group relative h-20 px-6 py-2 border flex flex-row items-center justify-between gap-2 transition-all overflow-hidden rounded-lg ${backgroundStyle === 'realistic' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-stone-200 text-gray-500 hover:border-gray-300'}`}
                                                        >
                                                            {backgroundStyle === 'realistic' && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-blue-500"></div>}
                                                            <div className="flex flex-col items-start">
                                                                <div className="font-bold text-sm font-mono uppercase">写实风格</div>
                                                                <div className="text-[10px] opacity-70 mt-0.5">电影质感 / 真实光影 / 摄影风格</div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Auto Save Gallery Toggle */}
                                                <div className="group relative p-6 bg-white rounded border border-stone-200 flex items-center justify-between hover:border-gray-300 transition-colors">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm text-gray-700 mb-1 font-mono">自动收藏 AI 绘图</span>
                                                        <span className="text-[10px] text-gray-400 font-mono">生成新场景时自动保存至画廊 (注意: 会占用存储)</span>
                                                    </div>
                                                    <button 
                                                        onClick={() => setAutoSaveGallery(!autoSaveGallery)}
                                                        className={`w-14 h-8 rounded-full relative transition-colors duration-300 focus:outline-none ${autoSaveGallery ? 'bg-indigo-500' : 'bg-gray-300'}`}
                                                    >
                                                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${autoSaveGallery ? 'left-7' : 'left-1'}`}></div>
                                                    </button>
                                                </div>

                                                {/* Font Size Controls */}
                                                <div className="space-y-4 pt-4 border-t border-stone-200">
                                                    <label className="text-xs text-gray-500 uppercase font-bold block">字体大小控制</label>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="bg-white p-3 rounded border border-stone-200">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-xs font-bold text-gray-700">剧情正文</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs font-mono text-indigo-600">{storyFontSize}px</span>
                                                                    <button onClick={() => setStoryFontSize(18)} className="text-[10px] text-gray-400 hover:text-indigo-500 px-1 rounded border border-gray-200 hover:border-indigo-300 transition-colors" title="重置">↺</button>
                                                                </div>
                                                            </div>
                                                            <input 
                                                                type="range" 
                                                                min="12" 
                                                                max="32" 
                                                                step="1" 
                                                                value={storyFontSize} 
                                                                onChange={(e) => setStoryFontSize(parseInt(e.target.value))}
                                                                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                            />
                                                        </div>
                                                        <div className="bg-white p-3 rounded border border-stone-200">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-xs font-bold text-gray-700">剧情回顾</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs font-mono text-indigo-600">{historyFontSize}px</span>
                                                                    <button onClick={() => setHistoryFontSize(15)} className="text-[10px] text-gray-400 hover:text-indigo-500 px-1 rounded border border-gray-200 hover:border-indigo-300 transition-colors" title="重置">↺</button>
                                                                </div>
                                                            </div>
                                                            <input 
                                                                type="range" 
                                                                min="12" 
                                                                max="24" 
                                                                step="1" 
                                                                value={historyFontSize} 
                                                                onChange={(e) => setHistoryFontSize(parseInt(e.target.value))}
                                                                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Font Family Control */}
                                                {setStoryFontFamily && (
                                                    <div className="space-y-4 pt-4 border-t border-stone-200">
                                                        <label className="text-xs text-gray-500 uppercase font-bold block">正文字体风格</label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {fontOptions.map((font) => (
                                                                <button
                                                                    key={font.value}
                                                                    onClick={() => setStoryFontFamily(font.value)}
                                                                    className={`
                                                                        p-3 rounded border text-sm transition-all shadow-sm
                                                                        ${storyFontFamily === font.value 
                                                                            ? 'bg-indigo-100 border-indigo-500 text-indigo-800' 
                                                                            : 'bg-white border-stone-200 text-gray-600 hover:bg-stone-50'}
                                                                    `}
                                                                    style={{ fontFamily: font.value }}
                                                                >
                                                                    <span className="block text-xs opacity-70 mb-1 font-sans">{font.label.split(' ')[0]}</span>
                                                                    <span className="text-lg">永恒的传说</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                        <p className="text-[10px] text-gray-400 mt-1">* 仅影响剧情展示正文与回顾面板，不影响系统UI。</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'gameplay' && (
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-xs text-indigo-600/70 uppercase tracking-widest mb-3 border-l-2 border-indigo-400 pl-2">交互模式</div>
                                            <div className="flex flex-col gap-3">
                                                <button 
                                                    onClick={() => setInputMode('choice')} 
                                                    className={`group relative h-20 px-6 py-2 border flex flex-row items-center justify-between gap-2 transition-all overflow-hidden rounded-lg ${inputMode === 'choice' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' : 'bg-white border-stone-200 text-gray-500 hover:border-gray-300'}`}
                                                >
                                                    {inputMode === 'choice' && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-indigo-500"></div>}
                                                    <div className="flex flex-col items-start">
                                                        <div className="font-bold text-sm font-mono uppercase">选项模式</div>
                                                        <div className="text-[10px] opacity-70 mt-0.5">从 AI 建议中选择</div>
                                                    </div>
                                                </button>
                                                
                                                <button 
                                                    onClick={() => setInputMode('text')} 
                                                    className={`group relative h-20 px-6 py-2 border flex flex-row items-center justify-between gap-2 transition-all overflow-hidden rounded-lg ${inputMode === 'text' ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm' : 'bg-white border-stone-200 text-gray-500 hover:border-gray-300'}`}
                                                >
                                                    {inputMode === 'text' && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-purple-500"></div>}
                                                    <div className="flex flex-col items-start">
                                                        <div className="font-bold text-sm font-mono uppercase">文本模式</div>
                                                        <div className="text-[10px] opacity-70 mt-0.5">自由输入指令</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'audio' && (
                                        <div className="space-y-8">
                                            {/* Wrapped Audio Controls in Cards for consistency */}
                                            <div className="group relative p-6 bg-white rounded border border-stone-200 flex items-center justify-between hover:border-gray-300 transition-colors">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm text-gray-700 mb-1 font-mono">全局静音</span>
                                                    <span className="text-[10px] text-gray-400 font-mono">关闭所有背景音乐与音效</span>
                                                </div>
                                                <button 
                                                    onClick={() => setIsMuted(!isMuted)}
                                                    className={`w-14 h-8 rounded-full relative transition-colors duration-300 focus:outline-none ${isMuted ? 'bg-indigo-500' : 'bg-gray-300'}`}
                                                >
                                                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${isMuted ? 'left-7' : 'left-1'}`}></div>
                                                </button>
                                            </div>

                                            <div className="group relative p-6 bg-white rounded border border-stone-200 hover:border-gray-300 transition-colors">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm text-gray-700 mb-1 font-mono">主音量</span>
                                                        <span className="text-[10px] text-gray-400 font-mono">调节游戏整体音量大小</span>
                                                    </div>
                                                    <span className="font-mono font-bold text-indigo-600">{Math.round(volume * 100)}%</span>
                                                </div>
                                                <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="1" 
                                                    step="0.05" 
                                                    value={volume} 
                                                    onChange={(e) => {
                                                        setVolume(parseFloat(e.target.value));
                                                        if(isMuted && parseFloat(e.target.value) > 0) setIsMuted(false);
                                                    }}
                                                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                />
                                            </div>
                                        </div>
                                )}
                          </div>
                      </div>

                      {/* Footer */}
                      <div className="p-6 border-t border-stone-200 bg-stone-50 flex justify-end shrink-0 z-30 relative">
                          <button 
                            onClick={onClose} 
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono px-8 py-3 clip-path-polygon hover:shadow-lg transition-all active:translate-y-0.5"
                            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                          >
                              保存配置
                          </button>
                      </div>
                  </div>
              </div>
        </div>
    );
};
