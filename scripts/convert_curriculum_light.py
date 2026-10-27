import re

with open('src/components/CurriculumView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Main page wrapper
content = content.replace("min-h-screen bg-slate-950 text-slate-100", "min-h-screen bg-slate-50 text-slate-900")

# Top header banner
content = content.replace(
    "border-b border-red-900/30 bg-gradient-to-r from-red-950/40 via-slate-900 to-black py-8",
    "border-b border-red-200 bg-gradient-to-r from-red-50 via-white to-slate-50 py-8"
)

# Heading text
content = content.replace("font-extrabold text-white tracking-tight", "font-extrabold text-slate-900 tracking-tight")
content = content.replace("bg-red-600/20 text-red-400 border border-red-500/30", "bg-red-100 text-red-700 border border-red-200")
content = content.replace("bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700", "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs")

# Progress widget
content = content.replace("bg-slate-900/90 border border-slate-800 rounded-2xl p-5 min-w-[280px] shadow-xl", "bg-white border border-slate-200 rounded-2xl p-5 min-w-[280px] shadow-sm")
content = content.replace("bg-slate-800 h-2.5 rounded-full overflow-hidden", "bg-slate-200 h-2.5 rounded-full overflow-hidden")

# Card backgrounds
content = content.replace("bg-slate-900 border border-slate-800", "bg-white border border-slate-200 shadow-2xs")
content = content.replace("bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80", "bg-white border-slate-200 hover:border-red-300 hover:bg-slate-50/80")
content = content.replace("bg-slate-900/80", "bg-white")
content = content.replace("bg-slate-900", "bg-white")
content = content.replace("bg-slate-950/70", "bg-slate-50")
content = content.replace("bg-slate-950/60", "bg-slate-100")
content = content.replace("bg-slate-950/80", "bg-white")
content = content.replace("bg-slate-950/40", "bg-slate-50")
content = content.replace("bg-slate-950", "bg-slate-50")
content = content.replace("border-slate-800", "border-slate-200")
content = content.replace("border-slate-700", "border-slate-300")
content = content.replace("text-slate-400", "text-slate-500")
content = content.replace("text-slate-300", "text-slate-700")
content = content.replace("hover:bg-slate-800", "hover:bg-slate-100")
content = content.replace("hover:text-white", "hover:text-slate-900")
content = content.replace("hover:bg-slate-950/40", "hover:bg-slate-50")
content = content.replace("shadow-red-950/40", "shadow-red-500/20")

# Input backgrounds in practice exercises
content = content.replace("bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-semibold text-white", "bg-slate-100 p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900")

with open('src/components/CurriculumView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Converted CurriculumView.tsx to light mode successfully!")
