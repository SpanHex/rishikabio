# Rishika - Bio Website

This website was built 1:1 from the `Rishika bio website.fig` design, matching all layout parameters, colors, fonts, photos, and interactive features.

## Project Structure
- `src/App.tsx` - Main React application component with hero section, scrapbook polaroid cards, interest cards, and footer.
- `src/index.css` - Tailwind CSS styles with custom `@font-face` bindings for the local fonts and typography hierarchy.
- `public/fonts/` - Embedded custom fonts:
  - `Adorable Minty.otf` (used for the main headline)
  - `Wonderful Butterfly.otf` (used for handwritten notes & annotations)
  - `DatBox.ttf` (used for the bold footer title)
- `public/assets/` - SVG flourishes, corner embellishments, badge icons, and high-resolution photo assets.
- `dist/` - Production-ready build artifacts.

## Running the Website

### Development Server
```bash
cd website
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Preview
```bash
cd website
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) in your browser.
