with open('src/components/seo/SeoCommandCenter.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix text-white on light backgrounds
c = c.replace('<h3 className="text-lg font-bold text-white">', '<h3 className="text-lg font-bold text-slate-900">')
c = c.replace('<h4 className="font-bold text-white', '<h4 className="font-bold text-slate-900')
c = c.replace('text-white font-mono', 'text-slate-900 font-mono')
c = c.replace('text-white font-extrabold', 'text-slate-900 font-extrabold')
c = c.replace('font-black text-white', 'font-black text-slate-900')
c = c.replace('font-bold text-white', 'font-bold text-slate-900')
# Restore text-white on red or emerald buttons
c = c.replace('bg-red-600 text-slate-900', 'bg-red-600 text-white')
c = c.replace('bg-red-600 hover:bg-red-500 text-slate-900', 'bg-red-600 hover:bg-red-500 text-white')
c = c.replace('bg-emerald-600 text-slate-900', 'bg-emerald-600 text-white')

with open('src/components/seo/SeoCommandCenter.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("SeoCommandCenter text adjusted for light mode.")
