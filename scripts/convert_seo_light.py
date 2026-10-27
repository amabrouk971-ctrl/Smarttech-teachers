import re

with open('src/components/seo/SeoCommandCenter.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace main wrapper
content = content.replace("min-h-screen bg-slate-950 text-slate-100", "min-h-screen bg-slate-50 text-slate-900")

# Header banner
content = content.replace(
    "border-b border-red-900/30 bg-gradient-to-r from-red-950/40 via-slate-900 to-black py-8",
    "border-b border-red-200 bg-gradient-to-r from-red-50 via-white to-slate-50 py-8"
)

# Text white in headers to slate-900
content = content.replace("font-black text-white tracking-tight", "font-black text-slate-900 tracking-tight")

# Card backgrounds
content = content.replace("bg-slate-900 border border-slate-800 rounded-2xl p-5 min-w-[280px] shadow-xl", "bg-white border border-slate-200 rounded-2xl p-5 min-w-[280px] shadow-sm")
content = content.replace("bg-slate-900 border border-slate-800", "bg-white border border-slate-200 shadow-2xs")
content = content.replace("bg-slate-900/60 hover:bg-slate-900", "bg-slate-100 hover:bg-slate-200 text-slate-700")
content = content.replace("bg-slate-900/90", "bg-white")
content = content.replace("bg-slate-900", "bg-white")
content = content.replace("bg-slate-950", "bg-slate-50")
content = content.replace("border-slate-800", "border-slate-200")
content = content.replace("border-slate-700", "border-slate-300")
content = content.replace("text-slate-400", "text-slate-500")
content = content.replace("text-slate-300", "text-slate-700")
content = content.replace("hover:bg-slate-800", "hover:bg-slate-100")
content = content.replace("hover:text-white", "hover:text-slate-900")
content = content.replace("hover:bg-slate-950/50", "hover:bg-slate-50")
content = content.replace("hover:bg-slate-950/40", "hover:bg-slate-50")
content = content.replace("text-white font-bold", "text-white font-bold") # keep button text
content = content.replace("shadow-red-950/50", "shadow-red-500/20")

with open('src/components/seo/SeoCommandCenter.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Converted SeoCommandCenter.tsx to light mode successfully!")
