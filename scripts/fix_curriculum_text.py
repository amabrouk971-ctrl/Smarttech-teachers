with open('src/components/CurriculumView.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix modal backdrops to subtle light overlays
c = c.replace('bg-black/80 backdrop-blur-sm', 'bg-slate-900/40 backdrop-blur-xs')
c = c.replace('bg-black/90 backdrop-blur-md', 'bg-slate-900/40 backdrop-blur-xs')

# Fix text-white inside white containers in modals
c = c.replace('<h3 className="text-lg font-bold text-white">', '<h3 className="text-lg font-bold text-slate-900">')
c = c.replace('<h4 className="text-xl font-bold text-white">', '<h4 className="text-xl font-bold text-slate-900">')
c = c.replace('<div className="font-bold text-sm text-white">', '<div className="font-bold text-sm text-slate-900">')
c = c.replace('<h3 className="font-bold text-white text-base">', '<h3 className="font-bold text-slate-900 text-base">')
c = c.replace('bg-slate-50 text-slate-100 print:bg-white print:text-black', 'bg-white text-slate-900 print:bg-white print:text-black')

with open('src/components/CurriculumView.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("Curriculum text colors adjusted for light mode.")
