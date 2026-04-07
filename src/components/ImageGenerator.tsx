import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Download, X, Image as ImageIcon } from 'lucide-react';

interface ImageGeneratorProps {
  onClose: () => void;
  onApply: (imageUrl: string) => void;
}

export default function ImageGenerator({ onClose, onApply }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Using gemini-2.5-flash-image as per guidelines for general image generation
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `High-quality, professional commercial signage photography. ${prompt}. Cinematic lighting, 8k resolution, photorealistic, premium aesthetic.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      let imageUrl = null;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        throw new Error("No image was generated in the response.");
      }
    } catch (err: any) {
      console.error("Generation Error:", err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `brs-signage-${Date.now()}.png`;
    link.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#030a1a] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[800px]"
      >
        {/* Left Side: Controls */}
        <div className="w-full md:w-1/3 p-8 border-r border-white/5 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-[#00d4ff]">
              <Sparkles size={20} />
              <h2 className="font-bold text-lg tracking-tight">AI Designer</h2>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
              Image Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A glowing LED neon sign for a luxury spa in a dark modern interior..."
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00d4ff]/50 transition-colors resize-none mb-6"
            />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-6">
                {error}
              </div>
            )}

            <button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-[#00d4ff] hover:bg-[#00c2e8] disabled:opacity-50 disabled:cursor-not-allowed text-[#030a1a] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Image
                </>
              )}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-[10px] text-white/30 leading-relaxed">
            Powered by Gemini AI. Generated images are optimized for 16:9 hero sliders.
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="flex-1 bg-black/40 p-8 flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait">
            {generatedImage ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full flex flex-col"
              >
                <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6">
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={downloadImage}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Download size={18} />
                    Download
                  </button>
                  <button
                    onClick={() => onApply(generatedImage)}
                    className="flex-1 bg-[#ff2d55] hover:bg-[#e6294d] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    Apply to Slider
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <ImageIcon size={32} className="text-white/20" />
                </div>
                <p className="text-white/40 text-sm max-w-[200px]">
                  Enter a prompt and click generate to see your custom sign design.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
